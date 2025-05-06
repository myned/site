---
title: Corosync
---

# Documentation

https://pve.proxmox.com/pve-docs/chapter-pvecm.html

# Reference

## Edit configuration

https://pve.proxmox.com/pve-docs/chapter-pvecm.html#pvecm_edit_corosync_conf

```
nano /etc/pve/corosync.conf
```

## Force quorum

```
pvecm expected 1
```

## Force remove node from cluster

https://pve.proxmox.com/pve-docs/chapter-pvecm.html#pvecm_separate_node_without_reinstall

### Remove node from cluster

```
pvecm delnode <node>
```

### Stop services

```
systemctl stop corosync.service pve-cluster.service
```

### Start filesystem in local mode

```
pmxcfs -l
```

### Remove configuration

```
rm /etc/pve/corosync.conf
rm /var/lib/corosync/*
rm -r /etc/corosync/*
```

### Restart cluster service

```
killall pmxcfs
systemctl start pve-cluster.service
```
