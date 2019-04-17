---
title: What Does Measurable Mean?
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

In many probability courses, you may run into phrases like "probability measure" or "measurable function" or "measurable space". I remember reading these even in graduate courses and thinking, "why the heck is everything measurable and what does that have to do with anything?!" 

It has only been through experience with the topic that I've come to have a deep appreciation for this phrase and the intuitive analogies that can be drawn. Hopefully from this post, you can gain at least a superficial intuition for what this word means and how it can enrich your understanding of probability theory as a whole.

## Let's start with rulers!
Let's suppose we would like to measure the length of a table. How would we do so? Let's imagine we are rather archaic and we choose to use a meter stick. In this case, the meter stick is our "length measure": in a sense, we are summarizing the length of a table into a quantitative value (e.g., 5 feet, 12 meters, etc.). You may choose to think of our length measure as a mapping from a space of objects to a space of concrete values!

Accordingly, our table is what we would call "measurable". That is, the table is an object that is capable of being summarized or mapped to a quantitative value. You may choose to think of the domain of our mapping function to be the space of all measurable objects. 

The idea of being "measurable" in this example is kind of stupid, because all objects that take up space have some sort of "length" associated with it. But what if we are not measuring normal objects?

Let's go one step further. Suppose we want to measure the cardinality of a discrete, finite set $S$. For example, we want a function that maps sets to natural numbers, where the corresponding number represents the cardinality of our input set. Clearly, such a function $f:S \rightarrow \mathbb{N}$ would be 

$$
f(S) = |S|
$$

But, in this example, our table is no longer measurable because it is not an element in our domain of our function. So it seems that an object being measurable implies that is must satisfy certain properties (namely, in our case, being a discrete, finite set!).

## Back to probability...
So let's connect this back to actual probability theory! If you prescribe to Kolmogorov's axioms of probability (which you probably should), then you are familiar with the concept of what defines a measure space: 

$$
(\Omega, \mathcal{F}, P)
$$