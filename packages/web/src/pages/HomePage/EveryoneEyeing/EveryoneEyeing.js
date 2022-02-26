import React from "react";
import "./EveryoneEyeing.css";

function EveryoneEyeing() {
  return (
    <div className="container">
      <div className="everyoneeyeing_main">
        <h5>What's Everyone Eyeing?</h5>
        <div className="everyoneyeing_image_container">
          <div className="everyoneeyeing_first">
            <a href="#">
              <img
                src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_1_2x_09022022.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="everyoneeyeing_second">
            <a href="#">
              <img
                src="https://ii3.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_2_2x_09022022.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="everyoneeyeing_third">
            <div className="everoneeyeing_third_first">
              <a href="#">
                <img
                  src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_3_2x_09022022.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="everoneeyeing_third_second">
              <a href="#">
                <img
                  src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_4_2x_09022022.jpg"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="everyoneeyeing_fourth">
            <div className="everyoneeyeing_fourth_first">
              <a href="#">
                <img
                  src="https://ii3.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_5_2x_09022022.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="everyoneeyeing_fourth_second">
              <a href="#">
                <img
                  src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_6_2x_09022022.jpg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EveryoneEyeing;
