---
title: L1 Loss and Sparse Solutions
date: "2020-01-11T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/l1-loss-and-sparse-solutions/"
category: "signal processing"
tags:
  - "Signal Processing"
description: "An overview of overdetermined and underdetermined systems, the role of regularization, and applications to compressed sensing."
---
## Regularization 
In a [previous post](https://www.alanqwang.com/posts/underdetermined-systems-and-regularization/), I discussed the concept of regularization in the underdetermined, least squares model:
$$
x^* = \argmin_x ||Ax - y||_2^2 + \lambda \mathcal{R}(x). 
$$

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
