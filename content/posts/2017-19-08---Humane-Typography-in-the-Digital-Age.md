---
title: What Does Probability "Measure" Mean?
date: "2019-04-16T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/humane-typography-in-the-digital-age/"
category: "Math"
tags:
  - "Math"
  - "Probability"
  - "Measure Theory"
description: "An attempt at an intuitive explanation and motivation behind measure theory, specifically as it applies to probability theory."
---

In many probability courses, you may run into phrases like "probability measure" or "measurable function" or "measurable space". But what does this word "measure" really mean and why is it necessary to have this notion in the first place?

## Let's start with rulers!
Suppose we would like to measure the length of a table. How would we do so? Let's imagine we are rather archaic and we choose to use a meter stick. In this case, the meter stick is our "length measure": in a sense, we are summarizing the length of a table into a quantitative value (e.g., 5 feet, 12 meters, etc.). You may choose to think of our length measure as a mapping from a space of objects to a space of concrete values!

Accordingly, our table is what we would call "measurable". That is, the table is an object that is capable of being summarized or mapped to a quantitative value. You may choose to think of the domain of our mapping function to be the space of all measurable objects. 

The idea of being "measurable" in this example is kind of stupid, because all objects that take up space have some sort of "length" associated with it. But what if we are not measuring normal objects?

Let's go one step further. Suppose we want to measure the cardinality of a discrete, finite set $S$. For example, we want a function that maps sets to natural numbers, where the corresponding number represents the cardinality of our input set. Clearly, such a function $f:S \rightarrow \mathbb{N}$ would be 

$$
f(S) = |S|.
$$

But, in this setting, our table is no longer measurable because it is not an element in our domain of our function. So it seems that an object being measurable implies that is must satisfy certain properties corresponding to our measuring function (namely, in our case, being a discrete, finite set!).

## Back to probability...
Let's connect this back to actual probability theory! Probability theory defines the notion of a measure space: 

$$
(\Omega, \mathcal{F}, P)
$$

Defined this way, $P$ is called our "probability measure", and it is analogous to our ruler "length measure" from before. That is, $P$ "summarizes" or "quantifies" its inputs in a standardized manner, just as a ruler "summarizes" a notion of length to some standardized unit of length. This probability measure is crucial to the study of probability theory precisely because we wish to summarize or quantify the uncertainty that is inherent in our world. 

Let's think carefully about how we want our probability measure to behave, and see how it connects with the axioms that Kolmogorov set up. For starters, we want our measure to quantify the notion of uncertainty inherent in certain events occurring. So, given an event (like the toss of coin or the roll of a die), we want $P$ to spit out a standardized number that quantifies the certainty of that event occurring (and that can be compared relative to other events!). Luckily for us, we already have a set that contains all the events of an experiment, $\mathcal{F}$. As for the number we spit out, an obvious choice is a number from the set $[0, 1]$, although this choice is relatively arbitrary.

Incredible! By thinking critically about the purpose of measures, we have decided that our probability measure should be a mapping 
$$
P : \mathcal{F} \rightarrow [0,1]
$$ 
For the output of the measure to have any sort of meaning, events that are more likely to occur should have higher measures and events that are less likely to occur should have lower measures. In particular, events that are absolutely certain to occur should have measure $1$. Or, said more rigorously, the event that represents the realization of any element in the sample space (i.e. the event $\Omega \in \mathcal{F}$) should have measure $1$:
$$
P(\Omega) = 1.
$$
Correspondingly, events that are impossible or will never occur should have measure 0, i.e. $P(\emptyset) = 0$. 

Of course, any event with degrees of uncertainty in between these two extremes should take a value between $0$ and $1$. 