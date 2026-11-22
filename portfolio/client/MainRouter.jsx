import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./src/about";
import Projects from "./src/project";
import Service from "./src/service";
import References from "./src/references";
import Contact from "./src/contact";
import Layout from "./components/Layout";
import ManageServices from "./admin/ManageServices";
import ManageProjects from "./admin/ManageProjects";
import ManageReferences from "./admin/ManageReferences";

const MainRouter = () => {
  return (
    <div>
      <Layout />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/project" element={<Projects />} />
        <Route exact path="/service" element={<Service />} />
        <Route exact path="/references" element={<References />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/services" element={<ManageServices />} />
        <Route path="/admin/projects" element={<ManageProjects />} />
        <Route path="/admin/references" element={<ManageReferences />} />
      </Routes>
    </div>
  );
};
export default MainRouter;
