import "./style.css";

const loadingText = document.getElementById("loading");
const listingsWrapper = document.querySelector(".listings");

async function getJobs() {
  // shows loading .. when fetching the data
  let loading = true;
  try {
    const res = await fetch("https://2660763.hs-sites.com/_hcms/api/jobs");
    if (res.ok) {
      loading = false;

      listingsWrapper.classList.remove("hidden");
      loadingText.classList.add("hidden");

      const jobs = await res.json();

      // Generate card for each job
      jobs.forEach((job) => {
        const [city, country] = job.location.split("|");
        const salary = job.salary.split(" ").join("");
        const labelClass = {
          "featured company": "bg-primary text-white",
          "new company": "bg-secondary text-surface-100",
        };
        listingsWrapper.innerHTML += `
          <div
            class="card bg-white rounded-2xl px-6 py-8 md:px-8 md:py-12 border border-surface-20 font-display font-medium xl:hover:bg-linear-to-b from-primary/15 to-secondary/15 cursor-pointer"
          >
            <div class="flex justify-between items-center">
              <img src="/company-logo.svg" alt="company name" />
              ${
                job.featured_label
                  ? `<div class="card__label rounded-lg py-2 px-3 capitalize text-body-copy-sm leading-[1.4] ${
                      labelClass[job.featured_label.toLowerCase()]
                    }">
                    ${job.featured_label}
                  </div>`
                  : ""
              }
            </div>

            <div class="text-surface-100 mt-8">
              <p
                class="card__pre-header uppercase font-bold font-inter text-pre-header xl:text-pre-header-lg leading-[1.25]"
              >${job.pre_header}</p>

              <h4
                class="card__job-title text-heading md:text-heading-md xl:text-heading-lg leading-[1.2] mt-2"
              >${job.job_title}</h4>

              <p class="card__company mt-4 text-body-copy-sm leading-[1.4]">${
                job.company
              }</p>
            </div>

            <div
              class="flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap md:gap-x-16 gap-y-4 mt-6 text-surface-70 font-medium text-body-copy-sm leading-[1.4]"
            >
              <div class="flex items-center gap-3">
                <img src="/pin.svg" alt="map pin icon" />
                <p class="card__location flex items-center gap-2 capitalize">
                  <span class="card__location-city">${city}</span>
                  <span class="h-6 w-[1px] bg-surface-70 block"></span>
                  <span class="card__location-country">${country}</span>
                </p>
              </div>

              <div class="hidden md:flex items-center gap-3">
                <img src="/clock-icon.svg" alt="clock icon" />
                <p class="card__job-type">${job.job_type}</p>
              </div>

              <div class="hidden md:flex items-center gap-3">
                <img src="/cash-icon.svg" alt="cash icon" />
                <p class="card__salary">${salary}</p>
              </div>

              <div class="hidden md:flex items-center gap-3">
                <img src="/calendar-icon.svg" alt="calendar icon" />
                <p class="card__date-posted">${job.date_posted}</p>
              </div>
            </div>
          </div>
        `;
      });
    }
  } catch (error) {
    console.error(error);
  }
}

getJobs();
