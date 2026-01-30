---
title: Python Virtual Env
---

# Python Virtual Env

## What is a virtual environment?

- An **isolated Python environment**
- Keeps project dependencies separate
- Prevents breaking **system Python**
- Required on modern Linux (PEP 668)

---

## 1️⃣ Create a virtual environment

```bash
python3 -m venv venv_name(.venv)
```

- `venv` = folder name (can be anything)
- Creates isolated Python + pip

---

## 2️⃣ Activate the virtual environment

### Linux / macOS

```bash
source venv_name/bin/activate
```

### Windows

```bash
venv_name\\Scripts\\activate
```

✔ Prompt shows `(venv)` when active

---

## 3️⃣ Deactivate the environment

```bash
deactivate
```

---

## 4️⃣ Install packages (inside venv)

```bash
pip install package_name
```

Example:

```bash
pip install requests PyYAML
```

✔ No `sudo`

✔ No `--user`

✔ No system impact

---

## 5️⃣ Check which Python / pip is used

```bash
which python
which pip
```

Or:

```bash
python --version
pip --version
```

---

## 6️⃣ Save dependencies

```bash
pip freeze > requirements.txt
```

---

## 7️⃣ Restore dependencies

```bash
pip install -r requirements.txt
```

---

## 8️⃣ Remove a virtual environment

```bash
deactivate   # if active
rm -rf venv
```

(No uninstall needed)

---

## 9️⃣ Common mistakes (remember this 🚨)

❌ `sudo pip install ...`

❌ `pip install --break-system-packages`

❌ Using system Python for projects

✔ Always use a venv for projects

---

## 🔁 Typical daily workflow

```bash
python3 -m venv venv_name
source venv_name/bin/activate
pip install -r requirements.txt
python app.py
deactivate
```

---

## 🧠 One-line memory trick

> Create → Activate → Install → Run → Deactivate
>

---

## Bonus: Quick uv equivalent (modern)

```bash
uv venv_name
source .venv_name/bin/activate
uv pip install requests
```
