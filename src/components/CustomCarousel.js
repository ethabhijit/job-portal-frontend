import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
import { getJobsForCarousel } from "../admin/helper/adminapicalls";
import { errorMessage } from "./CustomAlert";
import { API } from "../backend";

SwiperCore.use([Pagination, Autoplay]);

const CustomCarousel = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    setLoading(true);
    getJobsForCarousel()
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setJobs(data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <>
        {error && errorMessage(error)}
        {loading && (
          <div
            className="spinner-border spinner-border-sm text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            // when window width is <= 320px
            576: {
              slidesPerView: 1,
              spaceBetweenSlides: 10,
            },
            // when window width is <= 480px
            768: {
              slidesPerView: 2,
              spaceBetweenSlides: 20,
            },
            // when window width is <= 640px
            992: {
              slidesPerView: 3,
              spaceBetweenSlides: 30,
            },
          }}
          autoplay={{
            delay: 4000,
          }}
          className="mySwiper"
        >
          {jobs &&
            jobs.map((job) => (
              <SwiperSlide key={job._id} className="p-2">
                <p className="h6">{job.title}</p>
                <p className="fs-6">Skills: {job.skill}</p>
                <p className="fs-6">{job.noOfEmp} employee needed</p>
              </SwiperSlide>
            ))}
        </Swiper>
      </>
    </>
  );
};

export default CustomCarousel;
