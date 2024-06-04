'use client';

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";

function Slick() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const fakeData = [
    {
      id: 1,
      avatar: 'https://picsum.photos/id/237/50/50',
      photo: 'https://picsum.photos/id/240/300/300',
      title: 'Card Title 1',
      price: '0.5ETH',
      like: 10,
    },
    {
      id: 2,
      avatar: 'https://picsum.photos/id/238/50/50',
      photo: 'https://picsum.photos/id/241/300/300',
      title: 'Card Title 2',
      price: '1.0ETH',
      like: 20,
    },
    {
      id: 3,
      avatar: 'https://picsum.photos/id/239/50/50',
      photo: 'https://picsum.photos/id/242/300/300',
      title: 'Card Title 3',
      price: '0.8ETH',
      like: 15,
    },
    {
      id: 4,
      avatar: 'https://picsum.photos/id/243/50/50',
      photo: 'https://picsum.photos/id/244/300/300',
      title: 'Card Title 4',
      price: '0.9ETH',
      like: 25,
    },
    {
      id: 5,
      avatar: 'https://picsum.photos/id/45/50/50',
      photo: 'https://picsum.photos/id/46/300/300',
      title: 'Card Title 5',
      price: '0.3ETH',
      like: 8,
    },
    {
      id: 6,
      avatar: 'https://picsum.photos/id/247/50/50',
      photo: 'https://picsum.photos/id/248/300/300',
      title: 'Card Title 6',
      price: '1.2ETH',
      like: 30,
    },
    {
      id: 7,
      avatar: 'https://picsum.photos/id/249/50/50',
      photo: 'https://picsum.photos/id/250/300/300',
      title: 'Card Title 7',
      price: '0.7ETH',
      like: 12,
    },
    {
      id: 8,
      avatar: 'https://picsum.photos/id/251/50/50',
      photo: 'https://picsum.photos/id/252/300/300',
      title: 'Card Title 8',
      price: '1.5ETH',
      like: 50,
    },
  ];
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {fakeData.map((item, index) => (
          <div key={index}>
            <Card item={item} />
          </div>
        
        ))}
      </Slider>
    </div>
  );
}

export default Slick;
