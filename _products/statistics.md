---
layout: page
title: "Statistics"
description: "Understand how your users use your application."
image: /assets/images/products/statistics.jpg
external_url: https://statistics.mvdm.io
order: 4
---

**Understand how your users use your application.**

Knowing what your users do inside your application is essential for making the right product decisions. Statistics is a self-hosted web analytics service that gives you clear insight into user activity, request throughput, and usage patterns -- without sending your data to a third party.

## Active Users Dashboard

Track daily, weekly, and monthly active users (DAU/WAU/MAU) over any date range. Compare against a previous period or the same period last year to spot trends and measure growth. Group and filter by custom tags to understand usage patterns across different segments of your user base.

## Throughput Dashboard

Monitor total requests and average requests per minute, broken down by day. Identify traffic spikes, measure the impact of new releases, and understand how your application load changes over time. The same tag-based filtering lets you drill down into specific applications, features, or accounts.

## Request Log

Need to investigate a specific user's activity or debug an issue? The request log gives you a raw table of every tracked request with timestamp, URL, user, and tags. Filter and search to find exactly what you need without writing database queries.

## Tag-Based Filtering

Every tracked request carries arbitrary key-value tags -- application name, account, feature area, or any dimension that matters to your business. All dashboards support filtering and grouping by these tags, so you can slice your data however you need.

## Drop-In Integration

Install the `mvdmio.Statistics.Client` NuGet package in your .NET applications and tracking starts automatically. The client intercepts authenticated HTTP requests, captures user identity and custom tags, and reports them to the Statistics API. Static file requests and unauthenticated traffic are automatically excluded, keeping your data clean and relevant.

---

[Get started with Statistics](https://statistics.mvdm.io) and gain visibility into how your application is being used.
