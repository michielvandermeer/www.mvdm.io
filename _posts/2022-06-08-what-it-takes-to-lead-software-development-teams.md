---
layout: post
title: "What it takes to lead software development teams effectively"
date: 2022-06-08
author: Michiel van der Meer
categories: [Business, Software Development]
image: /assets/images/posts/what-it-takes-to-lead.jpeg
---

Clarity and focus.

Effective software development teams have a clear picture of their milestones, of what is expected of them, and of the way they work. After that they need to focus to make it all happen; meaning uninterrupted time to build the milestones you agreed on together.

## Milestones

By now it should be clear to everyone that working in iterations is the best way to develop medium and large software projects. Each iteration needs a clear definition of what should be built. There are several agile methodologies you could adopt to create those definitions. For example: in SCRUM the Product Owner defines Product Backlog Items and in Shape Up the Shaper defines a Pitch.

Effective software development starts with a crystal-clear definition. What should the feature make possible? What should be included? What should be left out? What pitfalls should be avoided?

Well-defined milestones talk about what a feature will allow the user to do and only very broadly on how the feature will work. Well-defined milestones never discuss how the developers should implement that feature. However, do make sure to record the result of implementation discussions between developers somewhere, preferably together with the milestone description. That way developers can refer back to it later.

I've added an example of a well-defined milestone description as well as some general guidelines in the 'examples' section at the end of this article.

## Expectations

People need to know what is expected of them and what they can expect from you so they can work effectively. Expectations that are not expressed cannot be honored, so take great care in defining your expectations well. Your teams will rise to the challenge as long as they know what the challenge is and it's not unreasonable.

Here is a list of expectations I give my teams:

- I expect you to work effectively, I will make sure you have everything you need to do so.
- I expect you to ask questions when something isn't clear to you, for as long as it takes for you to understand. I will answer questions and keep clarifying for as long as needed.
- I expect you to stop working at the end of the day. I do so too. Overwork is a planning issue and that makes it my problem, not yours.
- The only exception to the rule above: when there are issues on production I expect you to work on mitigating those issues for as long as it takes. I will be there to support you the whole time.
- I expect you to let me know as soon as possible when agreed deadlines cannot be met. We will re-negotiate the deadlines when this occurs.
- I expect you to let me know when something is wrong with you, the iteration, the project, or anything else. I can't promise a solution, but I'll do my best to resolve whatever comes up.

Your list of expectations is probably different. Write them down and discuss them with your team. Clarify where they have questions. Deviate from the no-overwork thing on your own peril.

## Methodology

As I said before: by now it should be clear to everyone that working in iterations is the best way to develop software in medium and large projects. Most businesses I've worked with have adopted SCRUM. That's a fine methodology, assuming you use it correctly. I prefer Shape Up myself, but SCRUM is so well-known these days that I still recommend it to most businesses starting out with agile. It's just easier to adopt something that everyone already has a reasonably good understanding of.

Whatever methodology you choose, make sure you're very clear on what that means for everyone. I will use SCRUM as the example here.

Enough has been written all over the internet about SCRUM, so I will only add three things.

Firstly, SCRUM has one document that you must have: the Definition of Done. This document describes clearly what is expected of the team when working on a Product Backlog Item. I also recommend including the Definition of Ready and the Sprint Definition of Done. I've added an example of a Definition of Done document that I use as a starting point in the 'examples' section at the end of this article.

Secondly, you should not focus on the SCRUM metrics (estimations and velocity). They're poor indicators; better than nothing, but not by much. Use them, but don't assign a lot of value to them. When something looks off, discuss why that something is important to you. Example: Velocity is lower each sprint for three sprints. Ask the team if there are any issues that they're encountering, like technical debt, and work on resolving those. This is opposed to hammering on velocity and how that number needs to go up sprint-over-sprint.

Thirdly, the SCRUM handbook is a starting point. You should adopt what works for you and keep refining that. When discussing the use of anything in SCRUM during a refinement make sure you understand why something is defined in SCRUM and then discuss on how you want that to work for you.

## Uninterrupted time

When all is said and done it is time for the bulk of the work. Defining is nice and all, but it doesn't result in anything until a developer gets to programming.

Writing code is difficult. It requires understanding complex systems and translating those into a language that a computer understands. It's much like writing an article or a book; that also requires you to understand the point you're trying to explain and translate those into words. Mental model into verbal model. Programming is mental model into computer model.

As a side-note: this is why programmers are usually annoyed when you talk loudly near them or interrupt them otherwise. It breaks their concentration, forcing them to rebuild the mental model when they regain their concentration. It's like losing your train of thought and having to rebuild your argument because someone interrupted you. If you've never experienced that you're probably used to saying incoherent nonsense when you talk. If that's the case you shouldn't be leading a development team.

Effective software developers need long stretches of uninterrupted time to focus, meaning 4-6 hours a day. They can't have meetings during that time if you want them to be effective. Schedule accordingly. This also means open-space offices are incredibly dumb if you want an effective team. Ever wondered why developers have headphones on all the time in those environments? Read the above side-note paragraph again if you don't know the answer.

I've seen developers be most effective when working from home. So much so that I now recommend every business with a development team to implement a 100% work-from-home policy.

## Conclusion

There is so much more that could be said and clarified that I won't get into in this article. Please get in touch if you want to talk about these ideas further. I can give you much more detail about anything that's still not clear to you.

## Examples

### Well-defined milestone

The PBI below is an example on how a milestone should be defined. Note that it does not discuss implementation details in the ticket itself, but does record the results of developer discussion below.

As a guideline, I start PBIs with the following outline and then adjust where it makes sense:

- What isn't possible yet, and should be possible after this milestone is implemented?
- Who will benefit from implementing this? How will they use it?
- How does this relate to already existing features?
- What should not be implemented yet, even though it relates to this milestone?

```
Average temperature calculation

To understand the way a plant grows, the Grower needs to know the average temperature per day in the selected greenhouse.
When correlated with the growth statistics (daily length increase in mm, daily stem diamater increase in mm) the Grower can extrapolate how favourable conditions were for the plant and adjust future strategy accordingly.
Average temperature should be shown next to growth statistics on all pages where growth statistics are displayed.

--Developer discussion--
The following pages contain growth statistics:
-  Greenhouse actual overview
-  Greenhouse statistics overview
-  Plant statistics overview

We don't have a calculation for Average Temperature on the greenhouse level yet. This should be implemented as part of the calculations suite. Parts of the Average Daily Outside Temperature can be re-used, or maybe a refactoring can be made so that a shared framework exists for both these calculations.
```

### Definition of Done

The document below is an example on how to write your Definition of Done. I usually also include the Definition of Ready. Sometimes a Sprint Definition of Done is also relevant.

```
--Definition of Done--
A Product Backlog Item (PBI) is done when:
-  The full implementation is merged to the 'development' branch
-  Automated tests have been written and pass that cover the main expectations described in the PBI
-  A short write-up has been made of the functionality that can be sent as part of the development newsletter that is published at the end of every sprint.
-  The Product Owner has evaluated the result during a short demo given by the team on the Demo environment.

--Definition of Ready--
A Product Backlog Item (PBI) is ready to be planned into a sprint when:
-  The PBI has been discussed with the team in at least one refinement meeting
-  The PBI has an estimation given by the team
-  There are no open questions remaining in the discussion section of the PBI

--Sprint Definition of Done--
A sprint is done when:
-  All (automated) integration tests pass
-  The implementation of all done PBIs is merged to the 'main' branch and deployed to production
-  A demo has been given to the stakeholders during a Sprint Review and all feedback is either resolved or recorded into new PBIs
-  A development newsletter is sent to all subscribers via Marketeer
-  Velocity and Happiness indicators are recorded into their respective documents on DevOps
```
