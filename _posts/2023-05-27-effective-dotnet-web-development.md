---
layout: post
title: "Effective .NET Web development for individuals and small teams"
date: 2023-05-27
author: Michiel van der Meer
categories: [Software Development]
tags: [dotnet, web development, rails, hotwire]
image:
  path: /assets/images/posts/effective-dotnet-web-development.jpeg
---

The challenge at my current employment is to get the most out of a small team and a relatively small budget. This essay is my vision on how to accomplish that.

## Background

At the time of writing I'm the tech-lead of [Jewel Software](https://www.jewelsoftware.com/). Jewel specializes in management and operation software for municipalities: Waste Collection, Public Space Maintenance, and Winter Maintenance.

The software is a mix of products. The management applications are all web-based. The operational applications are tablet-apps used on tablets in the trucks and other vehicles.

Jewel is a deliberately small company. We're currently 21 people, of which 6 developers; including myself.

With this team we develop and maintain 4 web-apps, 5 android apps, some 10 supporting web-apps, and a whole slew of services that do some of the heavy lifting for our products.

Needless to say, we continuously have to make difficult choices on how and where to spend our time. There is a lot to do and we only have a handful of people to do it. My challenge is to get more out of the people we have so that the ambitions of the company can be achieved.

While there are many areas that need to be covered to achieve the ambitions of Jewel, I will focus on the web-applications in this essay.

## State of developing large web applications in 2023

In companies I worked with in the past we usually had a front-end and a back-end team. Sometimes those disciplines were specialists in the same team; in those cases we also split the application in a front-end and a back-end. In the companies I worked with that usually meant an Angular front-end and an ASP.NET WebAPI back-end.

I used to have that separation in personal projects as well. However, I always found it cumbersome that all features had to be developed in two places. The UI had to be built in JavaScript, and the server-side had to be built in C#. All the data structures for communication between the two had to be duplicated. It was a lot of work.

Splitting the application into separate layers is great, maybe even preferred, when you have multiple teams. As described in [Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law): systems of an organization always mirror the structure of the organization. Multiple teams will usually build multiple applications that are each built by one of those separate teams.

But not always.

I discovered a different way to solve this when I stared a project in Ruby on Rails. I had heard good things about the framework and was surprised that it was used by large organizations like [GitHub](https://stackshare.io/github/github), [Twitter](https://stackshare.io/twitter/twitter), and [Shopify](https://stackshare.io/shopify/shopify). I wanted to know why they would use something like Rails over Java or .NET and how they seemingly circumvented Conway's Law.

## Back to basics: Server-Side Rendering

What I found when building my app in Rails was a return to the simplicity of the web that existed when I started as a hobby developer. Gone were the Single Page Applications (SPAs); gone was most of the JavaScript. Good old Server-Side Rendering (SSR) and simple browser interactions with forms were still the standard with Rails; and that was a great thing: it meant I was able to develop FAST.

But how did Rails manage to still present an application that had all of the modern interactions that we've come to expect from SPAs? Simple: the creators of Rails built [Hotwire](https://hotwired.dev/) to achieve the SPA feel in an SSR application. Hotwire has two parts: [Turbo](https://turbo.hotwired.dev/) and [Stimulus](https://stimulus.hotwired.dev/). With Turbo you can build an old-school MVC web application and, with very little adjustment, turn it into something that *feels* like a SPA. With Stimulus you can create rich user-interactions with very little JavaScript.

This means that you can use the fast development cycle of SSR and still have an application that has rich user interaction. Fast development *and* great usability. It also meant that I only had to learn a single language, a single framework, a single ecosystem, and one way of building a web application. Those are great things for small teams.

## Can we get that in ASP.NET?

ASP.NET has gone through many iterations. We've had WebForms, MVC, Razor, Razor Pages, and most recently, Blazor.

I think Blazor embodies the spirit of Rails with Hotwire the most, but they chose an approach that heavily relies on WebSocket or WASM technologies. Essentially Blazor is a layer that tries to simplify the complexity of the underlying approach. I'd love to give it a try someday, but it's not what I'm looking for at the moment. While I'm sure Blazer has potential, it's still too young for me to consider switching all our applications to it. SSR just has a better track-record; it's been here since the about the beginning of the internet.

What matches Ruby on Rails closest is ASP.NET MVC. It still exists as Razor Pages in the latest version of .NET. We can apply Turbo to that quite easily because it doesn't rely on Rails at all. It's just a set of conventions that need to be implemented on the server side. Stimulus is just JavaScript, so that integrates easily as well.

I've created a new NuGet package that packages Turbo and Stimulus and implements the server-side things Turbo needs in ASP.NET: [mvdmio.Hotwire.NET](https://github.com/mvdmio/Hotwire.NET). With this package it becomes easy to create a Rails-like application in .NET with all the power of Hotwire for rich user interaction.

## Why not rebuild the application in Rails if it's so much better?

In general I would never recommend rebuilding entire applications in another language. Applications are built on top of their respective technologies and can never easily be converted to work on top of another technology.

Furthermore, the people that built the application are experts in the language of their respective technology but usually not well-versed in other programming languages. Getting them to make the switch from C# to Ruby (in our case) is going to be very difficult.

It's also not necessary. C# is a great language, ASP.NET is a great web-development framework, and .NET is a great ecosystem. Turbo and Stimulus can both be used in any MVC-like application, so we can have the best of both worlds. With my NuGet package integration between ASP.NET MVC and Hotwire requires no additional implementation.

## What about you?

I'd love to hear what other people in the C# and .NET ecosystem think. Are you part of a small team? How are you making sure your development speed stays high and consistent?

If you decide to give [Hotwire for .NET](https://github.com/mvdmio/Hotwire.NET) a try, please let me know what I can improve in the package. Even better: submit a pull-request with your own additions!
