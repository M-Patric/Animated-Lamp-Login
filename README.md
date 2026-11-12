# Personalized Lamp Login

A responsive, lamp-inspired sign-in interface customized around a warm **brown, cream, and baby-blue** palette.

## Files

- `index.html` — page structure, lamp illustration, pull instruction, and sign-in form.
- `style.css` — palette, layout, responsive rules, lamp lighting, and animations.
- `script.js` — pull-cord interaction, lamp state, dust motes, password visibility, and demo form feedback.
- `favicon.svg` — matching lamp favicon.
- `icons.svg` — retained icon sprite; the GitHub mark is reused by the social sign-in button.

Keep these files together in the same folder.

## Run locally

The simplest option is to open the folder in Visual Studio Code and launch `index.html` with the **Live Server** extension. A local web server is recommended so the external SVG icon sprite loads consistently.

The page uses Google Fonts (`DM Sans` and `Playfair Display`) when a network connection is available. System fallbacks are included.

## Interaction

1. Read the floating instruction above the lamp.
2. Drag the small brass pull down to switch on the lamp and reveal the sign-in form.
3. Pull the cord again to switch the lamp off and return to the waiting state.
4. On a keyboard, focus the pull handle and press **Enter** or **Space** as the accessible alternative to dragging.

The form includes email and password fields, a remember-me checkbox, password visibility control, forgot-password feedback, and Google/GitHub buttons. The latter actions intentionally display a demo message rather than pretending to authenticate.

## Important: authentication is not connected

This project is a front-end interface only. The sign-in, password-reset, Google, and GitHub actions need to be connected to your chosen backend or identity provider before the page can authenticate real users. No password or account data is stored by this demo.

The original form had username, email, and password fields together under a **Sign In** heading. This version uses the more conventional email-and-password combination. Add a username field back if your actual authentication system requires one.

## Palette

| Role | Colour | Hex |
|---|---|---|
| Main lamp background | Deep brown | `#39271e` |
| Lamp and accents | Walnut brown | `#806047` |
| Main page background | Warm cream | `#f7f0e5` |
| Card surface | Soft cream | `#fffaf2` |
| Primary button | Baby blue | `#b9def1` |
| Primary button text | Deep blue-brown | `#28495d` |

The main colour values are defined as CSS custom properties at the top of `style.css`.
