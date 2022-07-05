import React, { useEffect, useState } from "react";
import "./MyWorksBeta.scss";
import { ReactComponent as FirstSite } from "../data/icons/Site_1.svg";
import { ReactComponent as SecondSite } from "../data/icons/Site_2.svg";
import { ReactComponent as ThirdSite } from "../data/icons/Site_3.svg";
import { ReactComponent as FourthSite } from "../data/icons/Site_4.svg";
import { ReactComponent as FifthSite } from "../data/icons/Site_5.svg";
import { ReactComponent as GitIcon } from "../data/icons/Github.svg";
import { ReactComponent as SiteLinkIcon } from "../data/icons/SiteLink.svg";

function Pillar({ side, data }) {
  return (
    <div className={`pillar ${side}pillar`}>
      <div className="numberBox">
        <div className="numberSlider pillarslidercarrier">
          {data.map((v, vi) => (
            <div key={vi} className="slider mono">
              <span>{`0${v.id}`}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bgBox">
        <div className="bgSlider pillarslidercarrier">
          {data.map((v, vi) => (
            <div
              key={vi}
              className="slider"
              style={{
                backgroundImage: `url(${require("../data/images/works_screenshots/" +
                  v.id.toString() +
                  ".jpg")})`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MyWorksBeta() {
  const [staticScroller, setScroller] = useState(1);
  let looseScroller = staticScroller;
  const worksData = [
    {
      id: 1,
      title: "taifa.io",
      description:
        "A website that tracks the relationship between politics and development across the country...",
      icon: FirstSite,
    },
    {
      id: 2,
      title: "scribe.io",
      description:
        "A website that uses machine learning to analyze users typing habits and train them to type faster...",
      icon: SecondSite,
    },
    {
      id: 3,
      title: "abode.me",
      description:
        "A website that tracks vital real estate factors across the country to determine the best value for money housing...",
      icon: ThirdSite,
    },
    {
      id: 4,
      title: "mindstream.io",
      description:
        "A website that allows a user to create flashcards and use them to memorize facts through smart repition...",
      icon: FourthSite,
    },
    {
      id: 5,
      title: "99shades.io",
      description:
        "A website that provides an interface for selecting and iterating over every possible visible color..",
      icon: FifthSite,
    },
  ];

  //set the width of the sitecarriers to a multiple of the number of works
  useEffect(() => {
    //preseting the carrier widths and transforms...
    const carriers = document.querySelectorAll(
      "div.slidecarrier:not(.btncarrier)"
    );
    const lsliders = document.querySelectorAll(
      "div.leftpillar .pillarslidercarrier"
    );
    const rsliders = document.querySelectorAll(
      "div.rightpillar .pillarslidercarrier"
    );

    carriers.forEach((v) => {
      v.style.width = `${worksData.length * 100}%`;
      v.style.transform = `translateX(0%)`;
      v.querySelectorAll("div.slider").forEach((s) => {
        s.style.flexBasis = `${(100 / worksData.length).toFixed(2)}%`;
      });
    });

    rsliders.forEach((v) => {
      v.style.transform = `translateY(-${
        (100 / (worksData.length + 0)).toFixed(2) * 2
      }%)`;
    });
    //...........................................

    //animating the carrier motion between the slides
    const animationData = {
      perFrame: 30,
      duration: 500,
      carrierTranslation: { animWindow: [0, 1], animId: undefined },
    };

    function scrollCarousel(e) {
      let rawPosition =
        Array.from(
          e.target.parentElement.parentElement.parentElement.children
        ).indexOf(e.target.parentElement.parentElement) + 1;

      let position =
        -((Math.max(Math.min(rawPosition, worksData.length), 1) - 1) * 100) /
        worksData.length;
      let pattern = /[\d\.-]+/g;
      let currPosition = parseInt(carriers[0].style.transform.match(pattern));
      let translation = position - currPosition;

      //animating the scroll
      let animPerFrame =
        translation / (animationData.duration / animationData.perFrame);
      let currTranslation = 0;
      animationData.carrierTranslation.animId = setInterval(() => {
        if (
          (currTranslation + animPerFrame) * animPerFrame >=
          translation * animPerFrame
        ) {
          carriers.forEach((v) => {
            v.style.transform = `translateX(${(
              currPosition + translation
            ).toFixed(2)}%)`;
            setToggleSizes(rawPosition);
          });
          clearInterval(animationData.carrierTranslation.animId);

          return;
        }
        carriers.forEach((v) => {
          v.style.transform = `translateX(${(
            currPosition + (currTranslation += animPerFrame)
          ).toFixed(2)}%)`;
          setToggleSizes(
            (-(currPosition + currTranslation) + 100 / worksData.length) /
              (100 / worksData.length)
          );
        });
      }, animationData.perFrame);
    }
    //.......................................

    //animating the toggle growth and shrinkage based on proximity to position
    const siteToggles = document.querySelectorAll(
      "div.selector .slider svg.logo"
    );

    function setToggleSizes(position) {
      siteToggles.forEach((v, vi) => {
        let dist = Math.sqrt(1 / (Math.abs(position - (vi + 1)) + 1));
        v.style.transform = `scale(${dist.toFixed(3)})`;
      });
    }
    //.......................................

    //placing and removing the onclick listener from the buttons...
    //setting the initial button sizes
    siteToggles.forEach((v, vi) => {
      v.addEventListener("click", scrollCarousel);
    });
    setToggleSizes(1);

    return () => {
      siteToggles.forEach((v, vi) => {
        v.removeEventListener("click", scrollCarousel);
      });
    };
  }, []);

  //change the position of the siteimage flex and the sitetext flex and the sitetoggle flex on change of loosescroller

  return (
    <div className="myworksbeta">
      <div className="carousel">
        <Pillar data={worksData} side={"left"} />
        <div className="maindisplay">
          <div className="siteimage">
            <div className="sitelinks">
              <div className="linkicons">
                <SiteLinkIcon />
                <GitIcon />
              </div>
            </div>
            <div className="slidecarrier imgcarrier">
              {worksData.map((v, vi) => (
                <div
                  key={vi}
                  className="slider"
                  style={{
                    backgroundImage: `url(${require("../data/images/works_screenshots/" +
                      v.id.toString() +
                      ".jpg")})`,
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="sitetext">
            <div className="slidecarrier txtcarrier">
              {worksData.map((v, vi) => (
                <div key={vi} className="slider">
                  <h2 className="mono primary">{/*`0${vi + 1}|`*/}</h2>
                  <h2 className="mono primary">{v.title}</h2>
                  <p>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Pillar data={worksData} side={"right"} />
      </div>
      <div className="selector">
        <div className="slidecarrier btncarrier">
          {worksData.map((v, vi) => (
            <div key={vi} className="slider">
              <div className="sitetoggle">
                <svg className="logo"></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}