import * as React from "react";
import { useState, useEffect, useContext } from "react";
import "../assets/styles/banner.css";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { UserContext } from "../context/UserContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Slide = ({ background, text, active }) => {
  const slideStyle = { backgroundImage: `url( ${background})` };
  return (
    <div className="slider__slide" data-active={active} style={slideStyle}>
      <div className="slider__slide__text">{text}</div>
    </div>
  );
};

const Banner = () => {
  const { wait, Banner } = useContext(UserContext);
  const [activeSlide, setActiveSlide] = useState(0);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    Banner().then((data) => {
      setBanner(data);
      console.log(banner);
      console.log(data);
      //handleSlide();
    });
  }, []);

  // const handleSlide=()=>{
  //   let i=banner.length;
  //   console.log(i);
  //   let obj={};
  //   while(i){

  //     obj['background']=banner[i];

  //   i--;
  // }
  //   }
  const prevSlide = () => {
    const slide = activeSlide - 1 < 0 ? banner.length - 1 : activeSlide - 1;
    setActiveSlide(slide);
  };

  const nextSlide = () => {
    const slide = activeSlide + 1 < banner.length ? activeSlide + 1 : 0;
    setActiveSlide(slide);
  };

  setTimeout(() =>nextSlide(),5000);

  return (
    <div>
      <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={wait}
            //onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
      {banner.map((slide, index) => (
        <Slide
          key={index}
          background={`data:image/*;base64,${slide}`}
          //text={slide.text}
          active={index === activeSlide}
        />
      ))}
  
      <div className="leftArrow" onClick={nextSlide}>
        <ArrowCircleRightIcon />
      </div>
      <div className="rightArrow" onClick={prevSlide}>
        <ArrowCircleLeftIcon />
      </div>
    </div>
  );
};

export default Banner;
