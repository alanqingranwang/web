---
title: L1 Loss and Sparse Solutions
date: "2019-01-11T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/l1-loss-and-sparse-solutions/"
category: "signal processing"
tags:
  - "Signal Processing"
description: "An overview of overdetermined and underdetermined systems, the role of regularization, and applications to compressed sensing."
---
## Regularization 
Regularization is what enables the adding of constraints, and makes finding solutions to underdetermined systems possible. Let's augment our optimization problem from $(1)$ by adding an additional regularization term:
$$
x^* = \argmin_x ||Ax - y||_2^2 + \lambda \mathcal{R}(x). 
$$
How does adding this term affect our solutions? One way to view it is as adding an additional cost term. Values of $x$ that cause high values of $\mathcal{R}(x)$ will be penalized, and therefore won't be feasible solutions in this setting. For example, if we define $\mathcal{R}(x) = ||x||_2^2$, then we will be penalizing answers with high $L2$ norms. So, in a sense, a regularization allows us to refine the space of feasible solutions. There is an "art" to designing these regularization functions, because one must have a sense a priori of what to penalize; that is, it is necessary to have an idea of what your solutions *should* look like, even before one obtains the solution!

This ties in nicely to another common interpretation of regularization, and that is as a prior distribution in a Bayesian setting. It can be seen that our model is actually a MAP estimate:
$$
\begin{aligned}
&\argmin_x ||Ax - y||_2^2 + \lambda \mathcal{R}(x) \\
&= \argmin_x e^{||Ax - y||_2^2 + \lambda \mathcal{R}(x)} \\
&= \argmax_x -e^{||Ax - y||_2^2} e^{\lambda \mathcal{R}(x)} \\
&\propto \argmax_x p(y|x)p(x) 
\end{aligned}
$$

Viewed this way, our regularization function represents a distribution from which we assume that our solution $x$ is sampled.

Here are two common regularization functions which are so common that they have special names:
### Ridge Regression
If we penalize solutions with high L2 norm, then we arrive at ridge regression:
$$
\hat{x} = \argmin_x ||Ax - y||_2^2 + \lambda||x||_2^2.
$$
The nice thing about ridge regression is that it has closed-form solution
$$
\hat{x} = (A^HA + \lambda I)^{-1}A^Hy.
$$
Interestingly, it can be seen that the ridge regression solution makes the otherwise rank-deficient matrix $(\Psi^T \Psi)^{-1}$ invertible by adding a constant $\lambda$ to the diagonal entries.

### LASSO
Alternatively, if we penalize solutions with high L1 norm, then we arrive at LASSO:
$$
\hat{x} = \argmin_x ||Ax-y||_2^2 + \lambda||x||_1.
$$
Specifically, it can be proved that LASSO arrives at the sparse solution with high probability. Amazingly, we can reformulate a highly intractable combinatorial problem as a continuous convex optimization problem and arrive at the same result.

Why does using the L1 norm lead us to a sparse solution? I will provide an intuitive, graphical explanation.

## Intuitive, Graphical Explanation
In a graphical sense, the optimal $\theta$ which solves the contrained optimization problem in $(1)$ is the $\theta^*$ that has the smallest norm and that also intersects the subspace formed by the constraints. Or, put another way, the optimal $\theta^*$ is the minimum element in the intersection between the set of norms and the set of solutions of the constraints.
![sparsity_lp.png](/media/sparsity_lp.png)
