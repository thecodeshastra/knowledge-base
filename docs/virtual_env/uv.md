---
title: Uv
---

# Uv

`uv` is a **fast Python package & environment manager**

It replaces: `pip`, `pip-tools`, and partially `venv`

---

## Why use uv?

- ⚡ Extremely fast (Rust-based)
- 📦 pip-compatible
- 🔒 Lock files for reproducibility
- 🧼 Safe with system Python (PEP 668 friendly)

---

## How to install

###

#### Linux / macOS

Use curl to download the script and execute it with sh:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

If your system doesn't have curl, you can use wget:

```bash
wget -qO- https://astral.sh/uv/install.sh | sh
```

Request a specific version by including it in the URL:

```bash
curl -LsSf https://astral.sh/uv/0.9.26/install.sh | sh
```

#### Windows

Use irm to download the script and execute it with iex:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Changing the execution policy allows running a script from the internet.

Request a specific version by including it in the URL:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/0.9.26/install.ps1 | iex"
```

#### Shell auto completion

```bash
echo 'eval "$(uv generate-shell-completion bash)"' >> ~/.bashrc
```

```powershell
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}
Add-Content -Path $PROFILE -Value '(& uv generate-shell-completion powershell) | Out-String | Invoke-Expression'
```

To get shell completion for uvx replace `uv` with `uvx` in above commands.

---

## 1️⃣ Create a virtual environment

```bash
uv venv

```

- Creates `.venv/` in current directory
- Uses correct Python automatically

Activate it:

```bash
source .venv/bin/activate

```

---

## 2️⃣ Initialize a project

```bash
uv init

```

Creates:

- `pyproject.toml`
- `.python-version` (optional)
- `.gitignore`

---

## 3️⃣ Add dependencies

```bash
uv add requests pyyaml

```

- Updates `pyproject.toml`
- Updates `uv.lock`

Add dev dependencies:

```bash
uv add --dev pytest black ruff
```

---

## 4️⃣ Install / sync dependencies

```bash
uv pip sync
```

- Installs **exact versions** from `uv.lock`
- Removes unused packages

---

## 5️⃣ Install from requirements.txt (legacy)

```bash
uv pip install -r requirements.txt

```

---

## 6️⃣ Run Python or scripts

```bash
uv run python main.py

```

Run a tool:

```bash
uv run pytest

```

(No manual activation required)

---

## 7️⃣ Update dependencies

```bash
uv lock --upgrade
uv pip sync

```

---

## 8️⃣ Remove a dependency

```bash
uv remove requests
```

---

## 9️⃣ Delete environment

```bash
rm -rf .venv
uv venv
```

---

## 🔁 One Real Project Example

```bash
# create project
mkdir demo-app && cd demo-app

# initialize
uv init

# create env
uv venv

# add dependencies
uv add requests pyyaml

# activate
source .venv/bin/activate

# use in code
python - <<EOF
import requests, yaml
print("uv works!")
EOF

# lock & sync
uv pip sync
```

---

## 🧠 Daily workflow to remember

```bash
uv init
uv venv
uv add <pkg>
uv pip sync
uv run python app.py
```

---

## 🚨 Best practices

✔ Commit `pyproject.toml` + `uv.lock`

✔ Use `uv run` instead of activating venv

❌ Don’t use `pip install` directly

❌ Don’t edit `uv.lock` manually

---

## 🧠 Memory trick

> init → venv → add → lock → sync → run
>

---

## Resources

- [UV docs](https://docs.astral.sh/uv/)
