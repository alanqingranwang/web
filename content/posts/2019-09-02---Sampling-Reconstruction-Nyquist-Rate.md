---
title: Sampling, Reconstruction, and the Nyquist Rate
date: "2019-09-09T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/digital-signals/"
category: "Signal Processing"
tags:
  - "Signal Processing"
  - "Math"
description: "Basic overview of the sampling theorem and the Nyquist Rate."
---

## Sampling in the Time Domain
Let $x_a(t)$ represent a continuous-time signal. We can sample the signal at a period $T$ to obtain a discrete-time signal of the following form:
$$
x[n] := x_a(nT)
$$   

For example, given $x_a(t) = e^{j\Omega_0 t}$, the result of sampling would be
$$
x[n] = e^{j\Omega_0 Tn} = e^{j\omega_0 n},
$$
where we defined a new frequency variable $\omega_0 := \Omega_0 T$.

## Sampling in the Frequency Domain
Suppose $x_a(t)$ has Fourier transform $X_a(\Omega)$ and $x[n] = x_a(nT)$ has DTFT $X_d(\omega)$. The transforms are then related by the following equation:
$$
X_d(\omega) = \frac{1}{T}\sum_{k=-\infty}^\infty X_a\left(\frac{\omega - 2\pi k}{T}\right)
$$
What this equation tells us is that the DTFT of the sampled signal has the same shape as the CTFT of the original, analog signal, scaled by a factor $\frac{1}{T}$ and *replicated* along the $\Omega$ axis at intervals of $2\pi$. The replication arises from the fact that some $\omega$ value will result in a value of $X_a\left(\frac{\omega-2\pi k }{T}\right)$ having some non-zero value. Since we are summing over all $k$, the resulting signal will be the superposition of all replicas which repeat every $2\pi$.

For example, if $T=1$ and $X_a(\Omega)$ has non-zero value in $[-\pi, \pi]$, then for $k=0$, 
$$
X_d(\omega) = X_a(\Omega).
$$
So $X_d(\omega)$ will take non-zero value over $[-\pi, \pi]$. But for $k=1$, 
$$
X_d(\omega) = X_a(\Omega-2\pi),
$$
which means $X_d(\omega)$ will take non-zero value over $[-\pi - 2\pi, \pi - 2\pi] = [-3\pi, -\pi]$. For all $k\in \mathbb{Z}$, this will "fill in" values for $X_d(\omega)$ over all of $\mathbb{R}$, since we sum all the replicas together.

## Reconstruction and Aliasing
If the DTFT $X_d(\omega)$ is bandlimited such that $X_d(\omega)$ takes non-zero value only over $\omega \in [-\pi, \pi]$, then it is possible to reconstruct the original signal from its samples. Since the shape of the CTFT is retained in the DTFT, reconstructing the original, analog signal is simple: apply a low-pass filter with cutoff $\omega_L = \omega_{max}$, where $\omega_{max}$ is the maximum frequency of the discrete signal, and additionally rescale by a factor $T$. This ideal digital-to-analog filter $G(\Omega)$ would look like the following in the frequency domain:
$$
G(\Omega) = \begin{cases}T, & |\Omega| \leq \frac{\pi}{T} \\ 0, &\text{otherwise.}\end{cases}
$$

If the DTFT $X_d(\omega)$ is not bandlimited, then perfect reconstruction is no longer possible. That is, a major problem arises due to the fact that the DTFT of the sampled signal $x[n]$ is $2\pi$-periodic. If the domain over which an individual replica takes non-zero value exceeds a length of $2\pi$, then the replica will interfere with the neighboring replica when summed together. To be more explicit, if the maximum frequency $\omega_{max}$ exceeds $\pi$, then aliasing will occur. Equivalently, aliasing will occur if
$$
\omega_{max} > \pi \implies \Omega_{max} T > \pi \implies T > \frac{\pi}{\Omega_{max}} \implies \frac{1}{f} > \frac{1}{2f_{max}} \implies f < 2f_{max}
$$
Thus, we arrive at the Nyquist rate, which states that perfect reconstruction of the sampled signal is possible if sampling is done at twice the maximum frequency of the original signal:
$$
f > 2f_{max}.
$$