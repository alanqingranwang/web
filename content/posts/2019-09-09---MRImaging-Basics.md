---
title: Undersampling in the Frequency Domain
date: "2019-09-09T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/mr-imaging/"
category: "Signal Processing"
tags:
  - "Signal Processing"
  - "Math"
description: "Applications in compressed sensing."
---

MR imaging (MRI) is based on the theory of nuclear magnetic resonance (NMR). This post focuses on the imaging portion of MR which concerns itself with data acquisition and reconstruction, largely ignoring the physical underpinnings NMR (although a brief overview is required for understanding).

## NMR
The body is comprised of many hydrogen atoms which consist of a single proton. When subjected to a constant magnetic field $\textbf{B}_0 = B_0 \textbf{z}$ whose direction is in the longitudinal axis $\textbf{z}$, the magnetic moment of the proton precesses around the longitudinal axis at a frequency known as the *Larmor frequency*:
$$
\omega = |\gamma| B_0,
$$
where $\gamma$ is the gyromagnetic ratio.

This precession can be modeled as a complex exponential if we define the transverse plane on which the magnetic moment precesses as a complex plane with transverse components:
$$
\textbf{m}_\perp = m_x + im_y = m_\perp e^{-i \omega t}
$$

Since the spin generates its own magnetic field $\textbf{b}$, this sinusoidal spin induces an electromotive force in a conductor loop that is positioned near the proton due to Faraday's Law:
$$
s = -\frac{d\Phi_b}{dt} = i \omega \Phi_b
$$
The flux $\Phi_b$ depends on the coil sensitivity function $c(\textbf{r})$ and the magnetic moment $m_\perp$. Altogether, the voltage signal through the conductor loop is
$$
s = i \omega c(\textbf{r}) \textbf{m}_\perp = i \omega c(\textbf{r}) m_\perp e^{-i \omega t}.
$$

## MR Imaging 
How do we measure the signal from many spins simultaneously in the body? Clearly, we cannot put one conductor loop for each individual proton.

If there was a way that we could differentiate each proton's signal by its location in space  that would be a good starting point to being able to separate signals spatially. In particular, let
$$
\textbf{m}_\perp := \textbf{m}_\perp(\textbf{r}), \text{     such that     } \textbf{m}_\perp(\textbf{r}) = m_\perp(\textbf{r})e^{i\omega(\textbf{r})t}),
$$
At the same time, if we measure the signals from all the spins within a certain area, we would measure the sum of all spins in that area:
$$
s = \int i \omega(\textbf{r}) c(\textbf{r}) \textbf{m}_\perp(\textbf{r}) d\textbf{r}
$$

The question is, how do we resolve between different $\textbf{m}_\perp(\textbf{r})$ at different points in space, while still using a single coil to measure a sum of all spins in that space? The answer is at the core of MR imaging.

## Gradient Field
Suppose we introduce a magnetic gradient field $\textbf{G}$ that varies linearly with space so that the total magnetic field in the $x$-direction is
$$
B(\textbf{r}) = B_0 + \textbf{G} \cdot \textbf{r}.
$$

Now, the precession frequency is
$$
\omega = \gamma(B_0 +\textbf{G} \cdot \textbf{r}) = \omega_0 + \gamma\textbf{G} \cdot \textbf{r}.
$$

Let's incorporate this gradient field into our signal $s$:
$$
\begin{aligned}
s &= \int i (\omega_0 + \gamma\textbf{G} \cdot \textbf{r}) c(\textbf{r}) m_\perp(\textbf{r}) e^{-i (\omega_0 + \gamma\textbf{G} \cdot \textbf{r})t} d\textbf{r} \\
  &= ie^{-i \omega_0 t}\int (\omega_0 + \gamma\textbf{G} \cdot \textbf{r}) c(\textbf{r}) m_\perp(\textbf{r}) e^{-i \gamma\textbf{G} \cdot \textbf{r}t} d\textbf{r} \\
  &\approx ie^{-i \omega_0 t}\int \omega_0 c(\textbf{r}) m_\perp(\textbf{r}) e^{-i \gamma\textbf{G} \cdot \textbf{r}t} d\textbf{r} \\

\end{aligned}
$$

In the last step, we can make a practical simplification and say that $\omega_0 + \gamma \textbf{G} \cdot \textbf{r} \approx \omega_0$ (usually, $\omega_0$ will be on the order of MHz and $\gamma \textbf{G} \cdot \textbf{r}$ will be on the order of kHz). Then, if we define an absorbing factor $P = \omega_0 c(\textbf{r})$, then we arrive at 
$$
s = Pe^{-i \omega_0 t} \int m_\perp(\textbf{r}) e^{-i \gamma \textbf{G} \cdot \textbf{r} t} d\textbf{r}.
$$

## Introducing $k$-space
Let's make one final substitution: we will define a variable 
$$
\textbf{k}(t) = \frac{\gamma}{2\pi} \textbf{G} t.
$$

Now, our signal is
$$
s(t) = Pe^{-i \omega_0 t} \int m_\perp(\textbf{r}) e^{-i 2 \pi \textbf{k} \cdot \textbf{r}} d\textbf{r}.
$$