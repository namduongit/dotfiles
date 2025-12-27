# 📦 Package Management on Arch Linux (Pacman & Yay)

This document explains how to use **pacman** (official Arch Linux package manager)
and **yay** (AUR helper) to install, update, query, and remove packages.

---

## 1. Pacman Overview

**Pacman** is the default package manager of Arch Linux.
It is used to download, install, update, and remove packages such as applications,
libraries, and desktop environments.

### Example
```bash
sudo pacman -S firefox
```
Result: Install firefox

## 2. Pacman Operations (Main Flags)

Pacman commands must include exactly one main operation.

Flag	Meaning
-S	Sync – Install / Update packages
-R	Remove – Remove packages
-Q	Query – Query installed packages
-U	Install package from local file (.pkg.tar.zst)
-F	Find which package owns a file
-D	Database management (advanced, rarely used)

## 3. Installing & Updating Packages (-S)

Command	Description
pacman -S pkg	Install a package
pacman -Ss keyword	Search for packages
pacman -Sy	Refresh package database
pacman -Syu	Update the entire system (recommended)
pacman -Sc	Remove old cached packages
pacman -Scc	Remove all cached packages (dangerous)

`Recommended` system update
```bash
sudo pacman -Syu
```

## 4. Removing Packages (-R)

Command	Description
pacman -R pkg	Remove a package
pacman -Rs pkg	Remove package + unused dependencies
pacman -Rns pkg	Remove package + dependencies + config files
pacman -Rc pkg	Remove package and all dependent packages (dangerous)

## 5. Query Installed Packages (-Q)

Command	Description
pacman -Q	List installed packages
pacman -Qs keyword	Search installed packages
pacman -Qi pkg	Show detailed package info
pacman -Ql pkg	List files installed by a package
pacman -Qe	List explicitly installed packages
pacman -Qdt	List orphan dependencies

`Remove` orphan packages
```bash
sudo pacman -Rns $(pacman -Qdtq)
```

---

***Note***: There are many other commands. You can use pacman -h to see more detailed information.