---
title: LUKS
---

# Documentation

https://wiki.archlinux.org/title/Dm-crypt/Specialties  
https://wiki.nixos.org/wiki/Full_Disk_Encryption

# Reference

## Add keyfile

```sh
sudo cryptsetup luksAddKey /dev/disk/by-*/<disk> <keyfile>
```

## Dump configuration

```sh
sudo cryptsetup luksDump /dev/disk/by-*/<disk>
```
