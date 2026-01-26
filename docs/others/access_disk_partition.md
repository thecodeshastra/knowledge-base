# Access Disk Partitions

> Be very careful. Always double-check the disk/partition. A wrong choice can wipe your OS.

---

## Windows

### Example - Access EFI Partition & Delete Boot Loader Entry

Goal: Temporarily mount the EFI/system partition, delete a boot folder, then restore things.

#### 1. Open disk tool

1. Open **Command Prompt as Administrator**.  
2. Start disk tool:  

```cmd
diskpart
```

#### 2. Select the correct disk and volume

1. List all disks:  

```cmd
list disk
```

1. Select the disk (example: disk 0):  

```cmd
sel disk 0
```

1. List volumes on that disk:  

```cmd
list vol
```

1. Select the **system/EFI** volume (example: volume 1):  

```cmd
sel vol 1
```

#### 3. Assign a drive letter to EFI partition

1. Assign a temporary letter (example: `N`):  

```cmd
assign letter=N
```

> Now the EFI partition is accessible as `N:` in Explorer / terminal.

#### 4. Delete unwanted boot loader folder

1. Exit disk tool (stay in admin terminal):  

```cmd
exit
```

1. Go to the EFI partition:  

```cmd
N:
dir        # or: ls
```

1. Enter EFI directory:  

```cmd
cd EFI
dir
```

1. Delete the folder you don’t want in the boot menu:  

```cmd
rmdir Folder_Name
```

#### 5. Cleanup: remove letter (and optional destructive actions)

1. Reopen `diskpart` and select the same disk & volume again:  

```cmd
diskpart
sel disk 0
sel vol 1
```

1. Remove the drive letter so it goes back to hidden system state:  

```cmd
remove letter=N
```

#### Optional (destructive) operations on the selected volume

- Delete the whole volume (even if protected):  

```cmd
delete volume override
```

- Format the volume (choose one filesystem):  

```cmd
format fs=NTFS
```

or  

```cmd
format fs=FAT32
```

---

## Linux

### Format a Disk & Merge/Delete All Partitions

Goal: Wipe a disk, create one new partition, format it, and mount it.

> Only do this on a **data disk**, never on your OS disk. Double-check device names.

#### 1. Identify the target disk

1. List disks and partitions:  

```bash
lsblk
# or
sudo fdisk -l
```

1. Choose your target disk, e.g. `/dev/sdb`.  

- **Do not touch** `/dev/sda` if that’s your OS drive.

#### 2. Unmount all partitions on that disk

1. For each mounted partition (examples):  

```bash
sudo umount /dev/sdX1
sudo umount /dev/sdX2
sudo umount /dev/sdX3
```

Replace `sdX1`, `sdX2`, … with real names like `sdb1`, `sdb2`.

#### 3. Delete all partitions and create a new one (fdisk)

1. Open `fdisk` on the disk:  

```bash
sudo fdisk /dev/sdX
# example: sudo fdisk /dev/sdb
```

1. Inside `fdisk` (interactive):

- `d` → delete a partition (repeat until no partitions left)
- `g` → create new **GPT** partition table
- `n` → create new partition
  - Press `Enter` for default partition number
  - Press `Enter` for default first sector
  - Press `Enter` for default last sector (use full disk)
- `w` → write changes and exit

Now you have one new partition, e.g. `/dev/sdX1` (`/dev/sdb1`).

#### 4. Format the new partition

1. Create an ext4 filesystem and label it (optional label `mydisk`):  

```bash
sudo mkfs.ext4 /dev/sdX1 -L mydisk
# example: sudo mkfs.ext4 /dev/sdb1 -L mydisk
```

#### 5. Mount the partition

1. Create a mount point and mount it:  

```bash
sudo mkdir -p /mnt/mydisk
sudo mount /dev/sdX1 /mnt/mydisk
# example: sudo mount /dev/sdb1 /mnt/mydisk
```

Now the new disk is available at `/mnt/mydisk`.
