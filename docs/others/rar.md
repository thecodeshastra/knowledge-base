# rar CheatSheet

##

### Install rar

#### For ubuntu, debian, etc

```bash
sudo apt install rar
```

#### Custom installation

```bash
curl -O https://www.rarlab.com/rar/rarlinux-x64-621.tar.gz
tar -xzf rarlinux-x64-621.tar.gz

cd rar

sudo cp rar unrar /usr/local/bin/
sudo chmod +x /usr/local/bin/rar /usr/local/bin/unrar
```

### Create Archive

```bash
rar a archive.rar file.txt              # Single file
rar a -r archive.rar /folder/           # Recursive
rar a -m5 archive.rar files/            # Max compression
rar a -pPassword archive.rar files/     # With password
```

### Extract Archive

```bash
rar x archive.rar                       # Extract (with folders)
rar e archive.rar                       # Extract (flat)
rar x -pPassword archive.rar            # Extract with password
rar x archive.rar /path/                # Extract to location
```

### List & Test

```bash
rar l archive.rar                       # List contents
rar t archive.rar                       # Test integrity
```

### Manage Archive

```bash
rar d archive.rar file.txt              # Delete file
rar a -u archive.rar newfile.txt        # Update/add file
rar r archive.rar                       # Repair damaged
```

---

## Compression Levels

```bash
-m0  # No compression (fastest)
-m3  # Balanced
-m5  # Maximum compression (slowest)
```

---

## Advanced Options

```bash
-v100m                                  # Split into 100MB volumes
-x*.tmp                                 # Exclude .tmp files
-hp                                     # Encrypt filenames
-z comment.txt                          # Add comment
```

---

## Most Used Real-World Examples

```bash
# Backup with max compression
rar a -m5 -r backup.rar /home/user/data/

# Password protected backup
rar a -m5 -pSecure123 backup.rar folder/

# Extract password protected
rar x -pSecure123 backup.rar

# Split large archive (100MB parts)
rar a -v100m -m5 big.rar /large/folder/

# Create and immediately test
rar a -m5 archive.rar files/ && rar t archive.rar

# Extract to specific location
rar x archive.rar /home/user/extracted/

# Update existing archive
rar a -u archive.rar newfile.txt

# Backup excluding temp files
rar a -r -x*.tmp -x*.log backup.rar /project/
```

---

## Flags Cheat Sheet

| Flag | What it does |
| --- | --- |
| `a` | Add to archive |
| `x` | Extract with structure |
| `e` | Extract flat |
| `l` | List files |
| `t` | Test archive |
| `d` | Delete file |
| `r` | Repair |
| `-r` | Recursive |
| `-m` | Compression level |
| `-p` | Password |
| `-v` | Split volumes |
| `-x` | Exclude files |
