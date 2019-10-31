---
title: Why Does L1 Loss Promote Sparsity?
date: "2019-10-31T22:40:32.169Z"
template: "post"
draft: true
slug: "/posts/why-does-l1-loss-promote-sparsity/"
category: "Machine Learning"
tags:
  - "Machine Learning"
description: "An intuitive and graphical explanation for the connection between L1 loss and sparse solutions, and how it relates to compressed sensing."
---

In typical least squares, we have a set of observation data $y \in \mathbb{R}^N$ and we wish to fit a linear model which is weighted by parameters $\theta \in \mathbb{R}^n$:
$$
y = \Psi \theta + \epsilon.
$$ 
The optimization we want to solve is 
$$
\argmin_\theta ||\Psi\theta - y||_2^2
$$
In these settings, $N \gg n$; i.e. $\Psi$ is a tall matrix and we have much more observations than parameters to tune (we have an overdetermined system). This is commonly the case in machine learning, for example.

It turns out the underdetermined case has its place in different domains, as we will see.

## Compressed Sensing
What happens if $N \ll n$, i.e. we have an underdetermined system? Suppose we have a vector $x$ which we know is sparse in some alternative basis. Denote the projection onto this basis by $\Psi$. Then,
$$
\theta = \Psi x.
$$
Later, we may want to reconstruct the original image from these sparse samples, $x = \Psi^{-1}\theta$. How do we find the sparse representation $\theta$ that is as sparse as possible, while still allowing for proper reconstruction?

We can denote this problem as a *constrained* optimization problem:
$$
\argmin ||\theta||^2 \text{   subject to   } x = \Psi^{-1}\theta. \tag{1}
$$ 

The underdetermined part comes into play if we reformulate this optimization problem as the Lagrangian:
$$
\argmin ||\Psi^{-1}\theta - x||_2^2 + \lambda||\theta||^2,
$$
where $\lambda \in \mathbb{R}^+$.

This setup is frequently referred to as regularized least squares. If the norm we use for $\theta$ is L2, then we arrive at the famous ridge regression:
$$
\argmin ||\Psi^{-1}\theta - x||_2^2 + \lambda||\theta||_2^2.
$$

Alternatively, if we use the L1 norm, then we arrive at the (even more) famous LASSO:
$$
\argmin ||\Psi^{-1}\theta - x||_2^2 + \lambda||\theta||_1^2.
$$
Specifically, it can be proved that LASSO arrives at the sparse solution with high probability. Amazingly, we can reformulate a highly intractable combinatorial problem with a continuous convex optimization problem and arrive at the same result.

Why does using the L1 norm lead us to a sparse solution? I will provide an intuitive, graphical explanation.

## Intuitive, Graphical Explanation

