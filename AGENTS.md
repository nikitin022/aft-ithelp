<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- Prototype only: all ITHelp screen data comes from `src/lib/demo-data.ts` — no backend, auth, or database, because the user asked for a clickable concept.
- Brand tokens (AFT palette, Neue Montreal/Arial, parallelogram graphics) live only in `src/styles.css`; components use semantic tokens, never hardcoded colors.
- Shared portal chrome lives in `src/components/portal-shell.tsx`; every role screen renders inside it for one consistent layout.
