// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> Homepage</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="software/index.html"><strong aria-hidden="true">2.</strong> Software</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="software/abstreet.html"><strong aria-hidden="true">2.1.</strong> A/B Street</a></li><li class="chapter-item expanded "><a href="software/ungap_the_map/index.html"><strong aria-hidden="true">2.2.</strong> Ungap the Map</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="software/ungap_the_map/user_guide.html"><strong aria-hidden="true">2.2.1.</strong> User guide</a></li><li class="chapter-item expanded "><a href="software/ungap_the_map/motivation.html"><strong aria-hidden="true">2.2.2.</strong> Motivation</a></li><li class="chapter-item expanded "><a href="software/ungap_the_map/plan.html"><strong aria-hidden="true">2.2.3.</strong> Project plan</a></li><li class="chapter-item expanded "><a href="software/ungap_the_map/tech_details.html"><strong aria-hidden="true">2.2.4.</strong> Technical details</a></li></ol></li><li class="chapter-item expanded "><a href="software/fifteen_min.html"><strong aria-hidden="true">2.3.</strong> 15-minute neighborhoods explorer</a></li><li class="chapter-item expanded "><a href="software/santa.html"><strong aria-hidden="true">2.4.</strong> 15-minute Santa</a></li><li class="chapter-item expanded "><a href="software/ltn/index.html"><strong aria-hidden="true">2.5.</strong> Low-traffic neighborhoods</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="software/ltn/tech_details.html"><strong aria-hidden="true">2.5.1.</strong> Technical details</a></li></ol></li><li class="chapter-item expanded "><a href="software/osm_viewer.html"><strong aria-hidden="true">2.6.</strong> OpenStreetMap viewer</a></li><li class="chapter-item expanded "><a href="software/parking_mapper.html"><strong aria-hidden="true">2.7.</strong> Mapping on-street parking</a></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded "><a href="user/index.html"><strong aria-hidden="true">3.</strong> User guide</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="user/new_city.html"><strong aria-hidden="true">3.1.</strong> Importing a new city</a></li><li class="chapter-item expanded "><a href="user/asu.html"><strong aria-hidden="true">3.2.</strong> ASU Lab guide</a></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded "><a href="proposals/index.html"><strong aria-hidden="true">4.</strong> Proposals</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="proposals/seattle_bikes/index.html"><strong aria-hidden="true">4.1.</strong> Seattle bike network vision</a></li><li class="chapter-item expanded "><a href="proposals/broadmoor.html"><strong aria-hidden="true">4.2.</strong> Allow bike and foot traffic through Broadmoor</a></li><li class="chapter-item expanded "><a href="proposals/lake_wash.html"><strong aria-hidden="true">4.3.</strong> Lake Washington Blvd Stay Healthy Street</a></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded "><a href="tech/index.html"><strong aria-hidden="true">5.</strong> Technical details</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tech/dev/index.html"><strong aria-hidden="true">5.1.</strong> Developer guide</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tech/dev/misc_tricks.html"><strong aria-hidden="true">5.1.1.</strong> Misc developer tricks</a></li><li class="chapter-item expanded "><a href="tech/dev/api.html"><strong aria-hidden="true">5.1.2.</strong> API</a></li><li class="chapter-item expanded "><a href="tech/dev/testing.html"><strong aria-hidden="true">5.1.3.</strong> Testing</a></li><li class="chapter-item expanded "><a href="tech/dev/data.html"><strong aria-hidden="true">5.1.4.</strong> Data organization</a></li><li class="chapter-item expanded "><a href="tech/dev/release.html"><strong aria-hidden="true">5.1.5.</strong> Release process</a></li><li class="chapter-item expanded "><a href="tech/dev/formats/index.html"><strong aria-hidden="true">5.1.6.</strong> Data formats</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tech/dev/formats/scenarios.html"><strong aria-hidden="true">5.1.6.1.</strong> Scenarios</a></li><li class="chapter-item expanded "><a href="tech/dev/formats/traffic_signals.html"><strong aria-hidden="true">5.1.6.2.</strong> Traffic signals</a></li></ol></li><li class="chapter-item expanded "><a href="tech/dev/ui.html"><strong aria-hidden="true">5.1.7.</strong> widgetry UI</a></li></ol></li><li class="chapter-item expanded "><a href="tech/map/index.html"><strong aria-hidden="true">5.2.</strong> Map model</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tech/map/geometry/index.html"><strong aria-hidden="true">5.2.1.</strong> Intersection geometry</a></li><li class="chapter-item expanded "><a href="tech/map/details.html"><strong aria-hidden="true">5.2.2.</strong> Details</a></li><li class="chapter-item expanded "><a href="tech/map/importing/index.html"><strong aria-hidden="true">5.2.3.</strong> Importing</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tech/map/importing/convert_osm.html"><strong aria-hidden="true">5.2.3.1.</strong> convert_osm</a></li><li class="chapter-item expanded "><a href="tech/map/importing/geometry.html"><strong aria-hidden="true">5.2.3.2.</strong> Road/intersection geometry</a></li><li class="chapter-item expanded "><a href="tech/map/importing/rest.html"><strong aria-hidden="true">5.2.3.3.</strong> The rest</a></li><li class="chapter-item expanded "><a href="tech/map/importing/misc.html"><strong aria-hidden="true">5.2.3.4.</strong> Misc</a></li></ol></li><li class="chapter-item expanded "><a href="tech/map/edits.html"><strong aria-hidden="true">5.2.4.</strong> Live edits</a></li><li class="chapter-item expanded "><a href="tech/map/platform.html"><strong aria-hidden="true">5.2.5.</strong> Exporting</a></li></ol></li><li class="chapter-item expanded "><a href="tech/trafficsim/index.html"><strong aria-hidden="true">5.3.</strong> Traffic simulation</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tech/trafficsim/discrete_event/index.html"><strong aria-hidden="true">5.3.1.</strong> Discrete event simulation</a></li><li class="chapter-item expanded "><a href="tech/trafficsim/travel_demand.html"><strong aria-hidden="true">5.3.2.</strong> Travel demand</a></li><li class="chapter-item expanded "><a href="tech/trafficsim/gridlock.html"><strong aria-hidden="true">5.3.3.</strong> Gridlock</a></li><li class="chapter-item expanded "><a href="tech/trafficsim/trips.html"><strong aria-hidden="true">5.3.4.</strong> Multi-modal trips</a></li><li class="chapter-item expanded "><a href="tech/trafficsim/live_edits.html"><strong aria-hidden="true">5.3.5.</strong> Live edits</a></li><li class="chapter-item expanded "><a href="tech/trafficsim/parking.html"><strong aria-hidden="true">5.3.6.</strong> Parking</a></li></ol></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded "><a href="project/index.html"><strong aria-hidden="true">6.</strong> Project</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="project/team.html"><strong aria-hidden="true">6.1.</strong> Team</a></li><li class="chapter-item expanded "><a href="project/contributing.html"><strong aria-hidden="true">6.2.</strong> Contributing</a></li><li class="chapter-item expanded "><a href="project/funding.html"><strong aria-hidden="true">6.3.</strong> Funding</a></li><li class="chapter-item expanded "><a href="project/motivations.html"><strong aria-hidden="true">6.4.</strong> Motivations</a></li><li class="chapter-item expanded "><a href="project/history/index.html"><strong aria-hidden="true">6.5.</strong> History</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="project/history/backstory.html"><strong aria-hidden="true">6.5.1.</strong> Backstory</a></li><li class="chapter-item expanded "><a href="project/history/year1.html"><strong aria-hidden="true">6.5.2.</strong> Year 1</a></li><li class="chapter-item expanded "><a href="project/history/year2.html"><strong aria-hidden="true">6.5.3.</strong> Year 2</a></li><li class="chapter-item expanded "><a href="project/history/year3.html"><strong aria-hidden="true">6.5.4.</strong> Year 3</a></li><li class="chapter-item expanded "><a href="project/history/retrospective/index.html"><strong aria-hidden="true">6.5.5.</strong> 3 year retrospective</a></li><li class="chapter-item expanded "><a href="project/history/vision_and_validate/index.html"><strong aria-hidden="true">6.5.6.</strong> 2022 retrospective</a></li><li class="chapter-item expanded "><a href="project/history/CHANGELOG.html"><strong aria-hidden="true">6.5.7.</strong> Full CHANGELOG</a></li></ol></li><li class="chapter-item expanded "><a href="project/users.html"><strong aria-hidden="true">6.6.</strong> Users</a></li><li class="chapter-item expanded "><a href="project/references.html"><strong aria-hidden="true">6.7.</strong> References</a></li><li class="chapter-item expanded "><a href="project/presentations.html"><strong aria-hidden="true">6.8.</strong> Presentations</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
