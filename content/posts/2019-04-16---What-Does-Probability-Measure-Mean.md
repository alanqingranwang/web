---
title: What Does Probability "Measure" Mean?
date: "2019-04-16T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/what-does-probability-measure-mean/"
category: "Math"
tags:
  - "Math"
  - "Probability"
  - "Measure Theory"
description: "An attempt at an intuitive motivation behind measure theory, specifically as it applies to probability theory."
---

In many probability courses, you may run into phrases like "probability measure" or "measurable function" or "measurable space". But what does this word "measure" really mean and why is it necessary to have this notion in the first place?

## Let's start with rulers!
![Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.](/media/meter-stick.jpg)

Suppose we would like to measure the length of a wooden table. How would we do so? Let's imagine we are rather archaic and we choose to use a meter stick. In this case, the meter stick is our "length measure": in a sense, we are summarizing the length of a table into a quantitative value (e.g., 5 feet, 12 meters, etc.). You may choose to think of our length measure as a mapping from a space of objects to a space of concrete values!

<figure class="float-right" style="width: 200px">
	<img src="/media/probability-measure-1.jpg" alt="Gutenberg">
	<figcaption>Our measurable object</figcaption>
</figure>

Accordingly, our table is what we would call "measurable". That is, the table is an object that is capable of being summarized or mapped to a quantitative value. You may choose to think of the domain of our mapping function to be the space of all measurable objects. 

The idea of being "measurable" in this example is kind of stupid, because all everyday objects that we can see take up space and can thus be "measured". But what if we are not measuring normal objects, but more abstract objects?

## Onto abstract objects...
Suppose we want to apply a measure over the space of discrete, finite sets $\mathcal{S}$. For example, we might define a measure that maps discrete, finite sets to natural numbers, where the corresponding number represents the cardinality of our input set. Clearly, such a mapping $f:\mathcal{S} \rightarrow \mathbb{N}$ would be 

$$
f(S) = |S|
$$
for an input $S \in \mathcal{S}$. And just like that, we have defined a measure over the set $\mathcal{S}$! We can make judgments about any set $S \in \mathcal{S}$ by, in part, looking at its measure, as well as make comparisons between two or more different sets in $\mathcal{S}$ from their respective measures. Essentially, our measure $f$ is able to provide us a summary of any object over which the measure is defined, which is very useful to us (especially if those objects are abstract entities like sets)! 

Notice that in this setting, our wooden table from before is no longer measurable because it is not an element in the domain of our measure $f$. So it seems that if an object is to be measurable, that object must satisfy certain properties corresponding to our measuring function (namely, in our case, being a discrete, finite set!).

## Back to probability!
Let's connect this back to actual probability theory! Probability theory defines the notion of a measure space: 

$$
(\Omega, \mathcal{F}, P)
$$

Defined this way, $P$ is called our "probability measure", and it is analogous to our "length measure" or "cardinality measure" from before. That is, $P$ "summarizes" or "quantifies" its inputs in a standardized manner, just as a ruler "summarizes" a notion of length to some standardized unit. This probability measure is crucial to the study of probability theory precisely because we wish to summarize or quantify the uncertainty that is inherent in our world. 

Let's think carefully about how we want our probability measure to behave. For starters, we want our measure to quantify the notion of uncertainty inherent in certain events occurring. So, given an event (like the toss of coin or the roll of a die), we want $P$ to spit out a standardized number that quantifies the certainty of that event occurring (and that can be compared relative to other events). Luckily for us, we already have a set $\mathcal{F}$ that contains all the events of a particular experiment, so our measure should be defined over this set. As for the number we spit out, an obvious choice is a number from the set $[0, 1]$, although this choice is relatively arbitrary.

Great! We have decided that our probability measure should be a mapping 
$$
P : \mathcal{F} \rightarrow [0,1]
$$ 
For the output of the measure to have any sort of meaning, events that are more likely to occur should have higher measures and events that are less likely to occur should have lower measures. In particular, events that are absolutely certain to occur should have measure $1$. Or, said more rigorously, the event that represents the realization of any element in the sample space (i.e. the event $\Omega \in \mathcal{F}$) should have measure $1$:
$$
P(\Omega) = 1.
$$
Correspondingly, events that are impossible or will never occur should have measure 0, i.e. $P(\emptyset) = 0$. 

Of course, any event with degrees of uncertainty in between these two extremes should take a value between $0$ and $1$. [Kolmogorov's axioms of probability](https://en.wikipedia.org/wiki/Probability_axioms) gives specifics as to how the measure is defined for all other events in $\mathcal{F}$, which I skip to spare you of the gritty details. 

The main takeaway is that the measure $P$ is a magical function that encapsulates the degree of randomness and uncertainty inherent in an event into a single number between $0$ and $1$. While its formal definition is rooted in the rigor of set theory, the motivation of a measure as an important concept in the setting of probability theory is fairly intuitive.

## The Bigger Picture
While what is presented in this post is merely a motivation for the notion of measures as it applies to probability, the idea of [measure theory](https://en.wikipedia.org/wiki/Measure_(mathematics)) is an incredibly deep and fleshed-out branch of mathematics that reaches far beyond the limits of probability. Different types of measures (e.g. Gibbs, Hausdorff, Dirac) have uses in a wide scope of fields like physics, statistical mechanics, and topology.  