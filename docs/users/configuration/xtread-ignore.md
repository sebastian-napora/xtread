# Ignoring Files

This document provides an overview of the Qwen Ignore (`.xtreadignore`) feature of Xtread Code.

Xtread Code includes the ability to automatically ignore files, similar to `.gitignore` (used by Git). Adding paths to your `.xtreadignore` file will exclude them from tools that support this feature, although they will still be visible to other services (such as Git).

## How it works

When you add a path to your `.xtreadignore` file, tools that respect this file will exclude matching files and directories from their operations. For example, when you use the [`read_many_files`](../../developers/tools/multi-file) command, any paths in your `.xtreadignore` file will be automatically excluded.

For the most part, `.xtreadignore` follows the conventions of `.gitignore` files:

- Blank lines and lines starting with `#` are ignored.
- Standard glob patterns are supported (such as `*`, `?`, and `[]`).
- Putting a `/` at the end will only match directories.
- Putting a `/` at the beginning anchors the path relative to the `.xtreadignore` file.
- `!` negates a pattern.

You can update your `.xtreadignore` file at any time. To apply the changes, you must restart your Xtread Code session.

## How to use `.xtreadignore`

| Step                   | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Enable .xtreadignore** | Create a file named `.xtreadignore` in your project root directory                       |
| **Add ignore rules**   | Open `.xtreadignore` file and add paths to ignore, example: `/archive/` or `apikeys.txt` |

### `.xtreadignore` examples

You can use `.xtreadignore` to ignore directories and files:

```
# Exclude your /packages/ directory and all subdirectories
/packages/

# Exclude your apikeys.txt file
apikeys.txt
```

You can use wildcards in your `.xtreadignore` file with `*`:

```
# Exclude all .md files
*.md
```

Finally, you can exclude files and directories from exclusion with `!`:

```
# Exclude all .md files except README.md
*.md
!README.md
```

To remove paths from your `.xtreadignore` file, delete the relevant lines.
