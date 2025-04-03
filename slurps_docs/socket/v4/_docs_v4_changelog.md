---
url: https://socket.io/docs/v4/changelog
scrapeDate: 2025-04-03T05:03:00.145Z
library: v4

exactVersionMatch: false
---

*   [](index.md)
*   Changelog

Version: 4.x

## Versioning Policy[​](_docs_v4_changelog.md#versioning-policy)

Socket.IO releases closely follow [Semantic Versioning](https://semver.org/).

That means that with a version number `x.y.z`:
*   when releasing critical bug fixes, we make a patch release by increasing the `z` number (ex: `1.2.3` to `1.2.4`).
*   when releasing new features or non-critical fixes, we make a minor release by increasing the `y` number (ex: `1.2.3` to `1.3.0`).
*   when releasing breaking changes, we make a major release by increasing the `x` number (ex: `1.2.3` to `2.0.0`).

## Breaking changes[​](_docs_v4_changelog.md#breaking-changes)

Breaking changes are inconvenient for everyone, so we try to minimize the number of major releases.

We have had two major breaking changes impacting the Socket.IO protocol over the years:
*   Socket.IO v2 was released in **May 2017**   Socket.IO v3 was released in **November 2020**

info

Socket.IO v4 (released in March 2021) did not include any update to the Socket.IO protocol (only a couple of breaking changes in the Node.js server API), so it isn't counted here.

Reference: [Migrating from 3.x to 4.0](_docs_v4_migrating-from-3-x-to-4-0_.md)

## Important milestones[​](_docs_v4_changelog.md#important-milestones)

Aside from the breaking changes listed above, here are the latest important changes in Socket.IO:

Version

Date

Description

[`4.7.0`](_docs_v4_changelog_4.7.0.md)

June 2023

Support for WebTransport

[`4.6.0`](_docs_v4_changelog_4.6.0.md)

February 2023

Introduction of [Connection state recovery](_docs_v4_connection-state-recovery.md)

`4.4.0`

November 2021

Support for [uWebSockets.js](_docs_v4_server-installation_.md#usage-with-uwebsockets)

`4.1.0`

May 2021

Introduction of [`serverSideEmit()`](_docs_v4_server-instance_.md#serversideemit)

`4.0.0`

March 2021

Rewrite to [TypeScript](https://www.typescriptlang.org/)

## Version usage[​](_docs_v4_changelog.md#version-usage)

As of June 2024:

`socket.io` package

![Client downloads per version](https://socket.io/images/server-downloads-per-version.png)![Client downloads per version](https://socket.io/images/server-downloads-per-version-dark.png)

`socket.io-client` package

![Client downloads per version](https://socket.io/images/client-downloads-per-version.png)![Client downloads per version](https://socket.io/images/client-downloads-per-version-dark.png)

[

Next

4.8.1 (October 25, 2024)

](_docs_v4_changelog_4.8.1.md)