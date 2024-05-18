 import React from 'react'
 import Layout from '../../Components/layout/Layout'
 import HeroSection from '../../Components/herosection/HeroSection'
 import BlogPostCards from '../../Components/blogpostcards/BlogPostCards'
 
 const Home = () => {
   return (
     <Layout>
        <HeroSection/>
        <BlogPostCards/>
     </Layout>
   )
 }
 
 export default Home