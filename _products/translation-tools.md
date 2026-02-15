---
layout: page
title: "Translation Tools"
description: "Translate your software without juggling files between people."
image: /assets/images/products/translation-tools.jpg
external_url: https://translations.mvdm.io
order: 2
---

**Translate your software without juggling files between people.**

Localizing software usually means sending translation files back and forth between developers and translators, dealing with merge conflicts, and hoping nothing gets lost along the way. Translation Tools eliminates that friction by connecting directly to your Git repository and giving everyone a browser-based editor to work in.

## Git-Native Workflow

Your translation files stay in your Git repository as the single source of truth. Translation Tools clones your repo via SSH, reads the translation files, and presents them in an editable interface. When translations are updated, the changes are committed and pushed back to your repository -- no file exports, no manual merges, no lost work.

Switch branches, pull the latest changes, and reset to the remote state, all from the web interface. Your translation workflow fits seamlessly into your existing development process.

## Intuitive Translation Editor

All translation keys are displayed in a table grouped by file, with a column for each locale. Click any cell to open the editor, where you can see the values in other languages side by side. Changed values are highlighted so you can easily review what has been modified before committing.

Non-technical team members and external translators can contribute directly -- no developer tools required, no training needed.

## Built-In Translation Suggestions

Not sure how to phrase a translation? Translation Tools automatically suggests translations using Google Translate based on the values already present in your other locales. Translators get a helpful starting point without ever leaving the editor.

## Azure DevOps Integration

Connect your Azure DevOps account to browse and select repositories directly from the UI. No need to manually configure SSH keys or repository URLs.

## Multi-Platform Support

Translation Tools supports the translation file formats used across major platforms:

- **.NET** -- `.resx` resource files
- **Android** -- `strings.xml`
- **iOS** -- `.strings` and `.stringsdict`
- **Ruby on Rails** -- `.yml`

Multiple file groups within the same project are automatically discovered and organized, so you can manage all your translations in one place regardless of your tech stack.

---

[Get started with Translation Tools](https://translations.mvdm.io) and simplify your localization workflow.
