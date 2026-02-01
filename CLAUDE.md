# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BetterGov LGU Template - A modern government portal template for Philippine Local Government Units (municipalities and provinces). The template adapts terminology and structure automatically based on `lguType` configuration (e.g., "Mayor" vs "Governor", "Barangays" vs "Municipalities/Cities").

## Commands

```bash
npm run dev          # Start development server on port 3000
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # Fix linting errors
npm run setup-lgu    # Interactive LGU configuration wizard
```

## Architecture

### Context-Driven Configuration

The app uses two React Context providers that wrap the entire application:

1. **`SiteConfigProvider`** (`src/contexts/SiteConfigContext.tsx`) - Provides all LGU configuration data and helper functions. Access via `useSiteConfig()`, `useLGULabels()`, `useSite()`, or `useLGU()` hooks.

2. **`LanguageProvider`** (`src/contexts/LanguageContext.tsx`) - Handles i18n with template variable interpolation. Access via `useLanguage()` hook which returns `{ language, setLanguage, t }`.

### Configuration System

All LGU-specific data lives in JSON files under `config/`:
- `site.json` - Core LGU info (type, name, contact, coordinates, theme)
- `officials.json` - Executive, legislative officials, department heads
- `subdivisions.json` - Barangays (municipality) or municipalities/cities (province)
- `hotlines.json`, `history.json`, `statistics.json`
- `translations.json` - Translation overrides

Config is loaded via `src/lib/config.ts` which exports typed getters and a `getLGUTypeLabels()` function that returns the correct terminology based on LGU type.

### Translation System

Uses `{{variable}}` template syntax in translation strings. Variables are automatically interpolated:
- `{{lguName}}`, `{{municipality}}`, `{{province}}`, `{{region}}`
- `{{lguType}}`, `{{leaderTitle}}`, `{{viceLeaderTitle}}`
- `{{hallName}}`, `{{deptPrefix}}`, `{{legislativeBody}}`

Languages supported: English (en), Filipino (fil), Ilocano (ilo)

### Path Aliases (tsconfig.json)

```
@/* → ./src/*
@/components/* → ./src/components/*
@/data/* → ./src/data/*
@/hooks/* → ./src/hooks/*
@/types/* → ./src/types/*
```

### Key Directories

- `src/app/` - Next.js App Router pages
- `src/components/layout/` - Header, Footer, HotlineBar, InfoBar
- `src/components/home/` - Homepage sections (Hero, PopularServices, QuickStats, etc.)
- `src/data/` - Service definitions, navigation structure, translations
- `src/types/config.ts` - TypeScript types for all configuration schemas

## Development Notes

- Uses Next.js 14 with App Router and React 18
- Tailwind CSS 4.1 with custom theme colors in `src/app/globals.css`
- Chart.js for statistics visualization, Leaflet for maps
- ESLint configured with `next/core-web-vitals` and `next/typescript`
- Unused variables prefixed with `_` are ignored by linter
- No test framework is currently configured
