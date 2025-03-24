import React from "react";
import HeroSinglePost from "./HeroSinglePost";
import { Possibilities } from "./Possibilities";
import { ConnectTools } from "./ConnectTools";
import { PopularIntegrations } from "./PopularIntegrations";
import FAQ from "../FAQ";

const SinglePost = ({ post }) => {
  // Supondo que post tem post.acf
  const { acf } = post;

  console.log(acf.app_title);
  console.log(acf.app_trigger);

  return (
    <div className="bg-white">
      <section className="w-full flex justify-center pb-10">
        <div className="w-full flex flex-col">
          <HeroSinglePost post={post} />
        </div>
      </section>
      {/* Section veja as possibilidades  */}
      <section className="w-full flex justify-center pb-10">
        <div className="max-w-[1280px] w-full flex flex-col">
          <Possibilities />
        </div>
      </section>
      {/* Section Conecte qualquer ferramenta  */}
      <section className="w-full flex justify-center pb-10">
        <div className="max-w-[1280px] w-full flex flex-col">
          <ConnectTools />
        </div>
      </section>
      {/* Section Integrações populares  */}
      {/* <section className="w-full flex justify-center pb-10">
        <div className="max-w-[1280px] w-full flex flex-col">
          <PopularIntegrations />
        </div>
      </section> */}
      {/* Section FAQ  */}
      <section className="w-full flex justify-center py-10">
        <div className="max-w-[1008px] w-full flex flex-col">
          <FAQ />
        </div>
      </section>
    </div>
  );
};

export default SinglePost;
