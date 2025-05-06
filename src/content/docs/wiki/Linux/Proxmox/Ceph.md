---
title: Ceph
---

# Documentation

https://pve.proxmox.com/pve-docs/chapter-pveceph.html  
https://docs.ceph.com/en/latest/

# Reference

## List placement groups by pool

```
ceph pg ls-by-pool <pool>
```

## CRUSH MSR (multi-step retry) rule

https://docs.ceph.com/en/latest/dev/crush-msr/

```
rule msr_rule {
    id <#>
    type msr_firstn
    step take default
    step choosemsr <#> type host
    step choosemsr <#> type osd
    step emit
}
```

## Manually edit CRUSH map

https://docs.ceph.com/en/latest/rados/operations/crush-map-edits/

### Dump

```
ceph osd getcrushmap -o crush.map
```

### Decompile

```
crushtool -d crush.map -o crush.dmap
```

### Edit

```
nano crush.dmap
```

### Compile

```
crushtool -c crush.dmap -o crush.map
```

### Import

```
ceph osd setcrushmap -i crush.map
```
