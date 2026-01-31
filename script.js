const materialFactors = {
  aluminum: 0.85,
  water: 0.5,
  regolith: 0.2
};

const baseRadiationPerDay = 1.0;     
const MSV_PER_RELATIVE_UNIT = 0.67;  


const EARTH_BACKGROUND_MSV_PER_YEAR = 2.4;
const CHEST_XRAY_MSV = 0.1;
const BANANA_MSV = 0.0001;


const materialSelect = document.getElementById("material");
const thicknessSlider = document.getElementById("thickness");
const thicknessValue = document.getElementById("thicknessValue");

const durationSlider = document.getElementById("duration");
const durationValue = document.getElementById("durationValue");

const resultText = document.getElementById("result");


const presets = {
  short:    { material: "aluminum", thickness: 0.2, duration: 180 },
  long:     { material: "water",    thickness: 1.0, duration: 900 },
  storm:    { material: "regolith", thickness: 2.0, duration: 600 },
  lavatube: { material: "regolith", thickness: 3.0, duration: 1000 }
};


function calculate() {
  const material = materialSelect.value;
  const thickness = parseFloat(thicknessSlider.value);
  const duration = parseInt(durationSlider.value);

  thicknessValue.textContent = thickness.toFixed(1) + " m";
  durationValue.textContent = duration + " days";

  const thicknessFactor = Math.exp(-thickness);

  const dailyRadiationRel =
    baseRadiationPerDay *
    materialFactors[material] *
    thicknessFactor;

  const dailyRadiationMSv = dailyRadiationRel * MSV_PER_RELATIVE_UNIT;
  const totalRadiationMSv = dailyRadiationMSv * duration;

  const percentBlocked =
    Math.max(0, Math.min(100, (1 - dailyRadiationRel) * 100));

  const earthYears = totalRadiationMSv / EARTH_BACKGROUND_MSV_PER_YEAR;
  const xrays = totalRadiationMSv / CHEST_XRAY_MSV;
  const bananas = totalRadiationMSv / BANANA_MSV;

  let verdict = "🟡 Risky";
  let verdictClass = "risky";

  if (totalRadiationMSv < 100) {
    verdict = "🟢 Safe";
    verdictClass = "safe";
  }
  if (totalRadiationMSv > 300) {
    verdict = "🔴 Dangerous";
    verdictClass = "danger";
  }

  resultText.innerHTML = `
    <strong>Radiation blocked:</strong> ${percentBlocked.toFixed(0)}%<br>
    <strong>Daily radiation (inside):</strong> ${dailyRadiationMSv.toFixed(2)} mSv/day<br>
    <strong>Total over mission:</strong> ${totalRadiationMSv.toFixed(0)} mSv<br>
    <strong>Verdict:</strong>
    <span class="verdict ${verdictClass}">${verdict}</span><br><br>

    <strong>Comparisons (rough):</strong><br>
  ~${earthYears.toFixed(1)} years of Earth background<br>
  ~${Math.round(xrays).toLocaleString()} chest X-rays<br>
  ~${Math.round(bananas).toLocaleString()} bananas
  `;

  if (verdictClass === "safe") resultText.style.borderLeft = "6px solid #4caf50";
  else if (verdictClass === "danger") resultText.style.borderLeft = "6px solid #f44336";
  else resultText.style.borderLeft = "6px solid #ff9800";
}

materialSelect.addEventListener("change", calculate);
thicknessSlider.addEventListener("input", calculate);
durationSlider.addEventListener("input", calculate);

document.querySelectorAll("#presets button").forEach(btn => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll("#presets button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    const p = presets[btn.dataset.preset];
    materialSelect.value = p.material;
    thicknessSlider.value = p.thickness;
    durationSlider.value = p.duration;

    calculate();
  });
});

calculate();

