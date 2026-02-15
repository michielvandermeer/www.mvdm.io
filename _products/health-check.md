---
layout: page
title: "Health Check"
description: "Know your app is up. Be the first to know when it isn't."
image: /assets/images/products/health-check.jpg
external_url: https://healthcheck.mvdm.io
order: 3
---

**Know your app is up. Be the first to know when it isn't.**

Your users expect your application to be available 24/7. Health Check monitors your services every minute and alerts you the moment something goes wrong -- so you can fix issues before your customers even notice.

## Uptime Monitoring

Health Check polls each of your service URLs every 60 seconds, recording response times and availability. When a service goes down or recovers, you receive an instant email notification. A re-check runs automatically after 10 seconds on status changes to filter out false positives, so you only get alerted when it matters.

## SSL Certificate Monitoring

Expired or misconfigured SSL certificates break trust and block users. Health Check inspects your certificates daily and notifies you when a certificate is missing, expired, or expiring within 14 days -- giving you plenty of time to renew before it becomes a problem.

## SSL Labs Security Grading

Every day, each of your domains is submitted to SSL Labs for a full TLS security analysis. The resulting grade (A+ through F) is displayed alongside your services, giving you clear visibility into your security posture without having to run manual scans.

## Automated Smoke Testing

Go beyond simple uptime checks with automated browser-based smoke tests. Health Check uses headless Chromium to crawl your application, following links and recording each page's status code, load time, JavaScript errors, and screenshots. Configure form inputs to test authenticated flows, and trigger smoke test runs via webhook to integrate them into your deployment pipeline.

## Custom Telemetry

Track what matters to your application. Your services can report custom metrics -- database size, record counts, queue lengths, or anything else -- via a simple API. These metrics are stored and displayed alongside your service health data, giving you a single dashboard for the full picture.

## Weekly Summary Reports

Every Monday, you receive a summary email with availability statistics and SSL Labs results for each of your projects. Stay informed without having to log in.

## Public Status Pages

Build trust with your users by sharing a public status page for each project. Status pages show service availability, SSL grades, and 90-day uptime history -- giving your users transparency into your service reliability.

## Easy Integration

Install the `mvdmio.HealthCheck.Client` NuGet package in your .NET applications to automatically expose a `/status` endpoint and report database health and application telemetry back to Health Check. Getting started takes minutes, not hours.

---

[Get started with Health Check](https://healthcheck.mvdm.io) and take control of your application's uptime.
