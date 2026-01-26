# NTFS-3G Guide

## 1. What ntfs-3g Is

- `ntfs-3g` is a userspace driver that lets Linux read and write to Windows NTFS partitions.
- It is mainly used to:
  - Access files on Windows disks from Linux.
  - Read and write external NTFS USB drives and portable disks.
  - Enable dual-boot setups where Linux needs access to Windows partitions.

---

## 2. Identify NTFS Partitions

### List disks and filesystems

```bash
lsblk -f
```

- Shows all disks and partitions in a tree.
- Look at the `FSTYPE` column for `ntfs` and note the device name (e.g. `/dev/sda1`, `/dev/sdb2`).
- You can also identify the partition by `LABEL` or `SIZE`.

---

## 3. Install ntfs-3g (If Needed)

### Debian / Ubuntu / Mint

```bash
sudo apt update
sudo apt install ntfs-3g
```

### Fedora / RHEL / CentOS

```bash
sudo dnf install ntfs-3g
# or older:
sudo yum install ntfs-3g
```

- Many modern distros already include it; installation is only needed if commands fail.

---

## 4. Mount NTFS Manually

### 4.1 Create a mount point

```bash
sudo mkdir -p /mnt/windows
```

### 4.2 Basic read-write mount

```bash
sudo mount /dev/sdXN /mnt/windows
# Example:
# sudo mount -t /dev/sda1 /mnt/windows
```

- On many systems, `mount` automatically uses `ntfs-3g` for NTFS.

### 4.3 Mount with specific ownership (avoid permission issues)

First, check your UID and GID:

```bash
id -u
id -g
```

Then mount:

```bash
sudo mount -o uid=1000,gid=1000 /dev/sdXN /mnt/windows
```

- Replace `1000` with your actual UID/GID if different.

### 4.4 Mount as read-only

```bash
sudo mount -o ro /dev/sdXN /mnt/windows
```

### 4.5 Explicitly use ntfs-3g

```bash
sudo ntfs-3g /dev/sdXN /mnt/windows
```

---

## 5. Unmount NTFS Safely

Always unmount before unplugging a drive or rebooting to avoid corruption.

### Unmount by mount point

```bash
sudo umount /mnt/windows
```

### Unmount by device

```bash
sudo umount /dev/sdXN
```

### Force/“lazy” unmount (use with caution)

```bash
sudo umount -l /mnt/windows
```

- Use only if the drive is “busy” and you understand the risk.

---

## 6. Check Mount Status & Info

### Show mounted NTFS filesystems

```bash
mount | grep ntfs
```

### Disk usage and types

```bash
df -hT
```

- Shows size, used space, and filesystem type for mounted partitions.

---

## 7. Fix Common NTFS Issues

### “Dirty” NTFS partition

- If Windows was hibernated or crashed, Linux may mount the partition read-only.
- Proper fix:
  - Boot into Windows.
  - Do a clean shutdown or run `chkdsk` on that drive.

### Quick fix on Linux with `ntfsfix`

```bash
sudo ntfsfix /dev/sdXN
```

- Fixes some common errors and schedules a full check on next Windows boot.
- Not a full replacement for Windows `chkdsk`.

---

## 8. Auto-Mount at Boot (fstab)

### 8.1 Get the UUID

```bash
sudo blkid /dev/sdXN
```

- Copy the `UUID="..."` value.

### 8.2 Edit `/etc/fstab`

```bash
sudo nano /etc/fstab
```

Add a line like:

```bash
UUID=your_uuid_here  /mnt/windows  ntfs-3g  defaults,windows_names  0  0
```

- `UUID=...` – use the UUID you got from `blkid`.
- `/mnt/windows` – must exist and will be the mount point.
- `ntfs-3g` – filesystem type/driver.
- `defaults,windows_names` – standard options + Windows-safe filenames.

Save and on next boot it will auto-mount. You can test immediately with:

```bash
sudo mount -a
```

## 9. Minimal Cheat Sheet

- List partitions: `lsblk -f`
- Install (Debian/Ubuntu): `sudo apt install ntfs-3g`
- Make mount directory: `sudo mkdir -p /mnt/windows`
- Mount RW: `sudo mount /dev/sdXN /mnt/windows`
- Mount with user perms:`sudo mount -o uid=$(id -u),gid=$(id -g) /dev/sdXN /mnt/windows`
- Read-only: `sudo mount -o ro /dev/sdXN /mnt/windows`
- Unmount: `sudo umount /mnt/windows`
- Quick fix: `sudo ntfsfix /dev/sdXN`
- Get UUID: `sudo blkid /dev/sdXN`
- Edit fstab: `sudo nano /etc/fstab`
