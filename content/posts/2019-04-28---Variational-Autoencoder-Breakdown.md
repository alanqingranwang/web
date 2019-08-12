---
title: Variational Autoencoders
date: "2019-08-11T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/variational-autoencoder/"
category: "Machine Learning"
tags:
  - "Machine Learning"
  - "Math"
description: "An overview how VAEs solve the questions inherent to latent variable models."
---

# Background: Latent Variable Models
VAEs are a type of latent variable model. Latent variable models assume the existence of an underlying, lower-dimensional set of data that "explains" or "produces" the data we may observe, but that is not observable itself.[^1]

<figure style="width: 500px">
	<img src="/media/mnist_tsne.PNG" alt="Gutenberg">
	<figcaption>The MNIST Dataset in two-dimensional plane. Without latent knowledge, the dataset is messy and patterns are difficult to uncover.</figcaption>
</figure>

Let's model this underlying set of data by a random variable $z$, which is commonly called the latent variable. Latent variable models assume that underneath the veritable mess of high-dimensional data $x$ that we observe, there is a set of data $z$ of lower dimension that is "causing" or "producing" the set of data $x$. Without knowing $z$, $x$ is very messy and patterns are difficult to discern. However, if we know the $z$ that caused $x$ to occur, we can much more easily characterize that datum.

<figure style="width: 500px">
	<img src="/media/mnist_tsne_clustered.PNG" alt="Gutenberg">
	<figcaption>The MNIST dataset in two-dimensional plane, color-coded by corresponding label. The clusters within the dataset become clearer when the existence of the latent space is known.</figcaption>
</figure>

Especially in the context of images, the latent variable model is very powerful. For example, $z$ could represent the integers $0,1,2,..., 9$, and $x$ could be images of handwritten digits. In this example, knowing the latent space $z$ helps us make sense of the data tremendously.

<figure style="width: 500px">
	<img src="/media/mnist_tsne_clustered_labeled.PNG" alt="Gutenberg">
	<figcaption>The MNIST dataset in two-dimensional plane, color-coded and labeled with corresponding digit.</figcaption>
</figure>

As is par for the course in most generative models, we would like to learn the distribution $p(x)$ over our training data, such that we can simply sample from this learned distribution to "generate" new examples that are similar to the data on which we trained. Specific to latent variable models is the idea that we can leverage our knowledge of the existence of the latent variable $z$, such that we can learn more accurate and robust models. 

Formally, if we let $x$ and $z$ be defined over the same probability space, then we may further expand $p(x)$ as
$$
p(x) = \int p(x,z)dz = \int p(x|z)p(z)dz. \tag{1}
$$

Dissecting this expression:
+ Mathematically, this follows from the law of total probability, where $z$ forms a partition over the sample space $\Omega = \mathbb{R}$. [^2].
+ $p(z)$ is called the *prior* and is a distribution over the latent space. Usually this distribution is quite simple or is forced to be simple by design.
+ $p(x|z)$ is called the *likelihood* and represents a distribution over $x$ given a specific realization of $z$. We can see that $x$ is "dependent" on $z$. One way to think of this distribution is as a function $f(z)$, where if we sample $z \sim p(z)$, the output of $f(z)$ is very close to training data $x$. [^3]

By representing the model in this fashion, the generation of a sample can be thought of as a process, whereby we first sample $z\sim p(z)$ and then pass that $z$ into a "function" of the form $p(x|z)$. This process must be done and integrated over all possible $z$'s in the latent space. You might notice that integrating over this entire space is a very time-consuming ordeal.

There are several questions that we might have at this point:
1. What is $p(z)$ and $p(x|z)$?
2. How do we avoid having to integrate over the entire latent space?
3. How can we leverage neural networks and training data to learn this model optimally?

In the rest of this post, I will discuss how VAEs address each of these questions.

# 1. What is $p(z)$ and $p(x|z)$?
VAEs force $p(z) = \mathcal{N}(0, I)$; i.e., the latent variables are distributed by a standard Gaussian. How could a space as complicated as the latent space be modeled by something as simple as a standard Gaussian? The reason is that the $z$ that is sampled from $\mathcal{N}(0, I)$ will be passed into $p(x|z)$, which is modeled as a neural network. The idea is that if a neural network learns a mapping from the latent space to the observed data space, then some layer in the network will learn a mapping from a standard normal to a sufficiently complicated function. That is the power of neural networks that VAEs leverage.

From here on out, I will use the notation $p_\theta(x|z)$ to enforce the idea that $p(x|z)$ is a neural network with learnable parameters $\theta$.

# 2. How do we avoid having to integrate over the entire latent space?
Now that we have defined how we are mapping the information, how do we go about solving Equation $(1)$? We could just sample a bunch of $z$'s from a standard normal and approximate $p(x)$ as:
$$
p(x) \approx \frac{1}{n}\sum_{i=1}^N p_\theta(x|z_i), \text{   where   } z_i \sim \mathcal{N}(0, I).\tag{2}
$$
The problem with this method is that it takes a really long time to sample enough $z_i$'s to get a good approximation of $p(x)$. In fact, most $z_i$'s will result in $p_\theta(x|z_i)$ having low value, and thus contribute little to our approximation. This makes sense intuitively; typically, only a very small subset of settings of $z_i$ will actually map to $x$. For example, given an image of a handwritten digit, the digit it represents can only be one number out of ten. With this method, we will be wasting time calculating conditional probabilities given all ten settings of $z_i$, when in reality only one setting of $z_i$ will actually have high probability!

<figure style="width: 700px">
	<img src="/media/vae-decoder-half.PNG" alt="Gutenberg">
	<figcaption>Our measurable object</figcaption>
</figure>

If only we knew a function, say $q(z|x)$, that would tell us the $z$'s that are most likely to result in observable $x$'s. The space of latent variables that are likely under this function $q$ would definitely be smaller than the entire latent space, so it would make the calculations a lot more tractable. Of course, a good $q$ would be very close to the distribution $p(z|x)$ that represents our model. How do we make sure that our function $q(z|x)$ is close to $p(z|x)$?

![vae-whole.png](/media/vae-whole.PNG)

# 3. How can we learn the model?
## The Objective Function
Enter the Kullback-Liebler Divergence, which measures similarity between two probability distributions. If we minimize the KL-divergence between $q(z|x)$ and $p(z|x)$, then we will have an approximation of $q(z|x)$ that is close to what we would like, and thus have a space of latent variables $z \sim q(z|x)$ that is meaningful. Let's start with the KL-divergence between $q$ and $p$:
$$
D_{KL}(q(z|x) || p(z|x)) = E_{z\sim q(z|x)}[\log q(z|x) - \log p(z|x)].
$$
Using Bayes' rule gets us the $p(z)$ and $p(x|z)$ that we are familiar with. Remember, we originally defined $p_\theta(x|z)$ to be parameterized by $\theta$, so now we incorporate $\theta$ into the parameter set over which we are minimizing:
$$
D_{KL}(q(z|x) || p(z|x)) = E_{z\sim q(z|x)}[\log q(z|x) - \log p_\theta(x|z) - \log p(z)] + \log p(x).
$$
Now, let's rearrange and simplify slightly:
$$
\begin{aligned}
\log p(x) - D_{KL}(q(z|x) || p(z|x)) &= -E_{z\sim q(z|x)}[\log q(z|x) - \log p(x|z) - \log p(z)] \\
&= E_{q(z|x)}[\log p(x|z)] - E_{z\sim q(z|x)}[\log q(z|x)-\log p(z)] \\
&= E_{q(z|x)}[\log p(x|z)] - D_{KL}(q(z|x) || p(z)). \tag{3} \\
&:= \text{ELBO}_{\theta, \phi}(x)
\end{aligned}
$$
From this expression, we can see that if we wish to minimize the KL-divergence between $q(z|x)$ and $p(z|x)$, it is equivalent to maximizing the expression in $(3)$, which is also known as the empirical lower bound (ELBO). In a sense, the KL-divergence term is an "error" term that describes the error between what we want to optimize, $p(x)$, and what we can tractably optimize, $\text{ELBO}_{\theta, \phi}(x)$. Since the KL-divergence can never be negative, we can effectively optimize what we want (which is intractable) by maximizing a lower bound of the value we want (which is tractable).

So, our objective function is effectively
$$
\argmax_{\theta, \phi}\text{ELBO}_{\theta, \phi}(x) = E_{z \sim q(z|x)}[\log p(x|z)] - D(q(z|x) || p(z)).
$$

Let's examine the two terms in this objective function more closely.

Although it may not look like it, this term is effectively a reconstruction loss. This is because in order to solve for this term, we must sample from $q$ to get a particular $z$ (equivalently, take an $x$ from our training set and encode it), and then run this $z$ through $\log p$ (equivalently, decode the $z$). This is equivalent to doing a forward pass through the entire autoencoder network! In addition, if $q$ does a good job of mapping $x$'s to $z$'s, and $p$ does a good job of transforming $z$'s back to $x$'s, then $p(x|z)$ will be close to $1$ and thus $\log p(x|z)$ will be close to $0$. So, this expectation term will indeed be minimized if the encoder-decoder pair can reconstruct outputs from inputs.

## Making the Objective Gradient Descent-able
The right hand side in this form is apt to perform gradient descent if we make some further design choices.

Let's define $q_\phi$ as being Gaussian distributed:
$$
q_\phi(z|x) = \mathcal{N}(z | \mu_\phi(x), \Sigma_\phi(x)).
$$
Note that $\mu_\phi(x)$ and $\Sigma_\phi(x)$ are deterministic functions of $x$. That is, we are assuming that the $z$ that maps to an observed $x$ is distributed normally with a mean and variance transformed through a function with input $x$. This function is the encoder neural network.

This form is convenient for us because there are only two parameters to learn that characterize the entire distribution, and these parameters can be learned through a neural network. In addition, the KL-divergence of two normal random variables has a closed form:
$$
D(\mathcal{N}(z | \mu_\phi(x), \Sigma_\phi(x)) || \mathcal{N}(0, I)) = \frac{1}{2}\left(tr(\Sigma(x)) + (\mu(x))^T (\mu(x)) - k - \log \det (\Sigma(x))\right),
$$
where $k$ is the dimensionality of distribution.

The other summation term $E_{q(z|x)}[\log p(x|z)]$ is found through sampling from $q$, i.e.
$$
E_{z \sim q(z|x)}[\log p(x|z)] \approx \frac{1}{N}\sum_{i=1}^N \log p(x|z_i), 
$$
$$
\text{   where   } z_i \sim q_\phi(z|x) = \mathcal{N}(z | \mu_\phi(x), \Sigma_\phi(x)).
$$

Additionally, note that this is the same strategy we were going to take originally in Equation $(2)$, but now we are sampling from $z$'s defined over $q(z|x)$; i.e., we are being much smarter and more tractable about which $z$'s we are using to approximate $p(x|z)$.

Let's take a step back and examine what we have done. We want to be able to approximate $p(x)$ as a sampling of many $p(x|z_i)$. To be smart about which $z_i$'s to pick so as to ensure that the $z_i$ maps to the corresponding $x_i$ with high probability, we also simultaneously learn a function $q(z|x)$ that maps $x$ to its corresponding latent variable $z$. If we sample from this $q(z|x)$ instead of picking any $z$ from the latent space, we can get better $z$'s that lead to good $p(x|z)$, and which in turn leads to estimating $p(x)$ more efficiently.



## References
1. https://arxiv.org/pdf/1606.05908.pdf

## Footnotes
[^1] This is referred to as the "manifold hypothesis".

[^2] Something that I was always confused about was what defines the sample space in cases like this. Clearly, $z$ is a vector whose elements can take any real value. So $z_i$ is a random variable with some distribution $p(z_i)$. In this setting, there is no underlying experiment with abstract events that must be explicitly mapped to real numbers. Because the random variable taking some value is the experiment in of itself, we can just think of all the outcomes in $\Omega$ as being the act of $z_i$ taking a value on the real line. So in essence, we may say
$$
\Omega = \{\omega : z_i = \omega, \omega \in \mathbb{R}\}.
$$

Or even simpler, we can think of this setting as disposing of $\Omega$ entirely and placing the measure on $\mathbb{R}$, where the entire real line is of measure $1$.

[^3] Actually, $p(x|z)$ will output high values for settings of $x$ which arise most probably from the given $z$, but as a way of thinking, viewing it as a function is sufficient.
