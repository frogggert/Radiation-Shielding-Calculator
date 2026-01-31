# Radiation-Shielding-Calculater

this project is an interactive, browser tool where you can see how different materials, thicknesses and mission durations affect radiation exposure for astronauts on mars.

It is designed as a fun sim, so of course it isn't 100% accurate. 
I though it was an interesting project, because it shows one of the many problems that we need to face on a mars expedition.

## Overview
Since Mars has such a thin atmosphere and no global magnetic field, there is a much higher exposure level of radiation compared to Earth. 

in the calculater you can choose:
- different shielding material
- adjust the thickness of the shielding
- set mission duration

## Features
- interactive slider for shielding thickness and mission duration
- material selection between aluminum, water and regolith
- calculation of: 
    - daily radiation dose
    - total radiation dose
    - percentage of radiation blocked
- clear risk catagories
- real world comparison:
    - equivalent years of earth backround radiation
    - numbers of xray (chest)
    - banana equivalent dose
- further feature coming soon trust

## Radiation Model
I used a simplified radiation model intended for educational purposes

my assumptions:
- mars surface radiation relative value of 1.0
- 1.0 relative unit corresponds to about 0.67 mSv/day
- shielding effectiveness depends on material and thickness, with diminishing returns
- radiation risk increases cumulatively over time

values set to levels like "safe" or "dangerous" are just indicators not medical limits

## Presets
the calculater includes presets that i thought were fun to add. 

## Technology
- HTML for structure
- CSS for styling etc etc
- JS for calculations and interactivity
- no external libraries or frameworks required

all run on a browser

## how to run
1. Download repository
2. open index.html in web browser (most should work i think)
3. have fun (optional)

## Hacklub reviewers
I hope you like my project :D
