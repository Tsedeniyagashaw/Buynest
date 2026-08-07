import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import home from "../assets/home4.png";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiChevronRight,
  FiPackage,
  FiSmartphone,
  FiHome,
  FiShoppingBag,
  FiWatch,
} from "react-icons/fi";

import { Link } from "react-router-dom";


function Home() {

  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);


  useEffect(() => {

    const fetchNewProducts = async () => {

      try {

        const res = await API.get("/products/new");
        setNewProducts(res.data);

      } catch(error) {

        console.log(error.response?.data);

      } finally {

        setLoading(false);

      }

    };


    fetchNewProducts();

  }, []);



  const categories = [
    {
      title: "Electronics",
      icon: FiSmartphone
    },
    {
      title: "Home & Living",
      icon: FiHome
    },
    {
      title: "Fashion",
      icon: FiShoppingBag
    },
    {
      title: "Accessories",
      icon: FiWatch
    }
  ];



  const features = [
    {
      icon: FiTruck,
      title:"Fast Delivery",
      description:"Quick and reliable delivery to your doorstep"
    },
    {
      icon: FiShield,
      title:"Secure Payment",
      description:"Safe and protected payment experience"
    },
    {
      icon: FiRefreshCw,
      title:"Easy Returns",
      description:"Simple returns within 30 days"
    },
    {
      icon: FiHeadphones,
      title:"Customer Support",
      description:"We're here whenever you need help"
    }
  ];



  return (

    <div className="min-h-screen bg-white">


      {/* HERO SECTION */}

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-5 ">


        <div className="grid lg:grid-cols-2 items-center gap-10">


          {/* LEFT */}

          <div>


            <p className="
              text-sm
              uppercase
              tracking-[0.3em]
              text-gray-500
              mb-6
            ">
              Premium Shopping Experience
            </p>



            <h1 className="
              text-5xl
              md:text-4xl
              lg:text-6xl
              font-semibold
              tracking-tight
              leading-tight
              text-gray-900
            ">

              Everything You Need.

            

            </h1>



            <p className="
              mt-6
              text-lg
              text-gray-600
              max-w-xl
              leading-relaxed
            ">
              Discover quality products at great prices
              with a smooth shopping experience built
              for modern lifestyles.
            </p>




            <div className="flex flex-col sm:flex-row gap-4 mt-8">


              <Link
                to="/product"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-8
                  py-4
                  bg-gray-900
                  text-white
                  rounded-lg
                  font-medium
                  hover:bg-gray-800
                  transition
                "
              >

                Shop Collection

                <FiChevronRight />

              </Link>



              {!token && (

                <Link
                  to="/register"
                  className="
                    flex
                    items-center
                    justify-center
                    px-8
                    py-4
                    border
                    border-gray-300
                    rounded-lg
                    text-gray-900
                    font-medium
                    hover:bg-gray-50
                    transition
                  "
                >

                  Create Account

                </Link>

              )}


            </div>



          </div>




          {/* IMAGE */}

          <div className="flex justify-center mt-7">


            <img
              src={home}
              alt="Shopping"
              className="
                w-full
                max-w-xl
                object-contain
              "
            />


          </div>



        </div>


      </section>





      {/* CATEGORY SECTION */}


      <section className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-8
        py-16
      ">


        <div className="mb-10">

          <h2 className="
            text-3xl
            font-bold
            text-gray-900
          ">
            Shop By Category
          </h2>


          <p className="text-gray-500 mt-2">
            Explore products made for every part of your life
          </p>

        </div>





        <div className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-5
        ">


          {
            categories.map((category,index)=>{

              const Icon = category.icon;


              return (

                <div
                  key={index}
                  className="
                    border
                    border-gray-200
                    p-6
                    rounded-xl
                    hover:border-gray-900
                    transition
                    cursor-pointer
                  "
                >

                  <Icon
                    className="
                      text-gray-900
                      w-7
                      h-7
                      mb-5
                    "
                  />


                  <h3 className="
                    font-semibold
                    text-gray-900
                  ">
                    {category.title}
                  </h3>


                </div>

              )

            })
          }


        </div>


      </section>







      {/* FEATURES */}


      <section className="
        bg-gray-50
        py-16
      ">


        <div className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
        ">


          <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-8
          ">


            {
              features.map((feature,index)=>{


                const Icon = feature.icon;


                return (

                  <div key={index}>


                    <Icon
                      className="
                        w-8
                        h-8
                        text-gray-900
                        mb-4
                      "
                    />


                    <h3 className="
                      font-semibold
                      text-gray-900
                      mb-2
                    ">
                      {feature.title}
                    </h3>


                    <p className="
                      text-sm
                      text-gray-500
                    ">
                      {feature.description}
                    </p>


                  </div>

                )


              })
            }



          </div>


        </div>


      </section>








      {/* NEW PRODUCTS */}


      <section className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-8
        py-16
      ">


        <div className="
          flex
          justify-between
          items-center
          mb-10
        ">


          <div>

            <h2 className="
              text-3xl
              font-bold
              text-gray-900
            ">
              Latest Arrivals
            </h2>


            <p className="
              text-gray-500
              mt-2
            ">
              Discover our newest products
            </p>

          </div>



          <Link
            to="/product"
            className="
              flex
              items-center
              gap-1
              text-gray-900
              font-medium
            "
          >

            View All

            <FiChevronRight />

          </Link>


        </div>






        {
          loading ? (

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-6
            ">

              {
                [...Array(4)].map((_,i)=>(

                  <div
                    key={i}
                    className="
                      h-72
                      bg-gray-100
                      animate-pulse
                      rounded-xl
                    "
                  />

                ))
              }


            </div>


          ) : newProducts.length === 0 ? (


            <div className="
              text-center
              py-16
              border
              rounded-xl
            ">


              <FiPackage
                className="
                  mx-auto
                  w-10
                  h-10
                  text-gray-400
                  mb-4
                "
              />


              <p className="text-gray-500">
                No products available
              </p>


            </div>



          ) : (


            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-6
            ">


              {
                newProducts.map(product=>(

                  <ProductCard
                    key={product._id}
                    product={product}
                  />

                ))
              }


            </div>


          )
        }



      </section>








      {/* CTA */}


      {
        !token && (

          <section className="
            max-w-7xl
            mx-auto
            px-6
            lg:px-8
            pb-20
          ">


            <div className="
              bg-gray-900
              rounded-2xl
              p-10
              md:p-16
              text-center
            ">


              <h2 className="
                text-3xl
                md:text-4xl
                font-bold
                text-white
              ">
                Ready to start shopping?
              </h2>



              <p className="
                text-gray-300
                mt-4
                mb-8
              ">
                Join BuyNest and discover amazing products today.
              </p>




              <Link
                to="/register"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-8
                  py-4
                  bg-white
                  text-gray-900
                  rounded-lg
                  font-medium
                  hover:bg-gray-100
                "
              >

                Create Account

                <FiChevronRight />

              </Link>



            </div>


          </section>

        )
      }



    </div>

  )
}


export default Home;