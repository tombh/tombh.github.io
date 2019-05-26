---
date: 2019-04-20
layout: post
slug: synching-and-backup-notes
title: Synching and Backup Notes
categories:
- Geeky
---

Here are some brief notes about installing [Syncthing](https://syncthing.net/) and [Borg](https://github.com/borgbackup/borg).

I use Syncthing to synchronise certain files between my phone, laptop and remote VM. The files are mostly backups of things like; photos, wifi passwords, 2FA config, SSH keys, laptop config and ZSH history. There is also clipboard sync so that I can copy/paste between my local tmux environment and my remote environment.

Syncthing is peer to peer, so there is no client/server model. Every install can sync to every other install and vice versa. There are of course lots of config settings so you can do things like mark a folder as Send (or Recieve) only. The Syncthing design consists of just 2 concepts; Folders and Devices. When Syncthing says that a folder or device is in a certain state such as "Up To Date", this just means *locally*, as in Syncthing is aware of the local state and is ready to transmit the metadata of that state elsewhere.

I originally spent about a month experimenting with mounting my remote VM Syncthing folder onto a Google Bucket (just like AWS S3) using [gcsfuse](https://github.com/GoogleCloudPlatform/gcsfuse). I wanted to not have to care about resizing my own disks, with a bucket you essentially have infinite pay-only-for-what-you-use storage. However, eventually I gave up on it as it caused some frustrating performance issues in Syncthing. The fact is that Syncthing does a lot of scanning, which just doesn't play well with the unorthodox nature of a HTTP REST-based API file storage system mounted onto a local disk. Besides a 50Gb disk is way more than I need and only costs a couple of dollars per month.

Backups serve 2 purposes, extra redundancy and lightweight historical snapshots. Syncthing also has some history features, like keeping versions, or sending deleted files to an intermediate trash folder. But I decided to only use Borg's history settings. Borg has a convenient wrapper tool called [Borgmatic](https://torsion.org/borgmatic/), it allows to simplify all your backup needs into a simple YAML file. I simply add paths to the Borgmatic YAML file and a `systemd` service does the backups, cleans up snapshots, checks for problems and ships off copies of the archives to other devices and a Borg-specific service called at [https://www.borgbase.com](https://www.borgbase.com) which has a free 5Gb tier. This service has a nice feature where it emails you if it notices that too many scheduled backups have been missed.
