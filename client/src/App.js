// import logo from './logo.svg';
// import './App.css';
//  import Login from './components/login';
//  import User from './components/User';
//  import {BrowserRouter,Routes,Route} from "react-router-dom";
// import Administrator from './components/Administrator';
// import Register from './components/register';
// import Success from './components/success';
//  import Snav from './components/sidenav';
// import MyComplain from './components/MyComplain';
// import Edit from './components/Edit';
// import Forgot from './components/Forgot';
// import RoleWork from './components/RoleWork';
// import Dashboard from './components/Dashboard';
// import AISuggestion from './components/AISuggestion';
// import IrrigationPlanner from './components/IrrigationPlanner';
// import FertilizerAdvisor from './components/FertilizerAdvisor';
// import AIChatbot from './components/AIChatbot';
// import SustainabilityReport from './components/SustainabilityReport';
// // import Login from './components/login';
// function App() {
//   return (
//     <div className="App">
     
//   <BrowserRouter>
//   {/* <Snav/> */}
//   <Routes>
//         {/* <Route exact path="/" index element={<C1/>}/>
//         <Route path='/Arr' element={<Arr/>}/>
//         <Route path='/Arr/Update' element={<Update/>}/>
//         <Route path='Arr/TableView' element={<TableView/>}/>
//         <Route path='Arr/TableView/Arr' element={<Arr/>}/> */}
//         {/* <Route path='/Arr/Update/Localstorage' element={<LocalStorage/>}/> */}
//         <Route exact path="/" index element={<Dashboard/>}/>
//          <Route path='/User' element={<User/>}/>
//          <Route path='/Administrator' element={<Administrator/>}/>
//     <Route path='/register' element={<Register/>}/>
//     <Route path='/login' element={<Login/>}/>
//     <Route path='/success' element={<Success/>}/>
//     <Route path='/MyComplain' element={<MyComplain/>}/>
//     <Route path='/Edit' element={<Edit/>}/>
//     <Route path='/forgot' element={<Forgot/>}/>
//     <Route path='/RoleWork' element={<RoleWork/>}/>
//     <Route path="/dashboard" element={<Dashboard />} />
//     <Route path="/ai-suggestion" element={<AISuggestion/>}/>

//     <Route path='/irrigationplan' element={<IrrigationPlanner/>}/>
//            <Route path='/fertilizer-advice' element={<FertilizerAdvisor/>}/> 
//         {/* {/* <Route path='/Arr/TableView/Arr' element={<Arr/>}/> */}
//         <Route path='/chatbot' element={<AIChatbot/>}/>
//         <Route path='/report' element={<SustainabilityReport/>}/>
       
       
//       </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;







// import logo from './logo.svg';
// import './App.css';
// import Login from './components/login';
// import User from './components/User';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Administrator from './components/Administrator';
// import Register from './components/register';
// import Success from './components/success';
// import Snav from './components/sidenav';
// import MyComplain from './components/MyComplain';
// import Edit from './components/Edit';
// import Forgot from './components/Forgot';
// import RoleWork from './components/RoleWork';
// import Dashboard from './components/Dashboard';
// import AISuggestion from './components/AISuggestion';
// import IrrigationPlanner from './components/IrrigationPlanner';
// import FertilizerAdvisor from './components/FertilizerAdvisor';
// import AIChatbot from './components/AIChatbot';
// import SustainabilityReport from './components/SustainabilityReport';
// import ProtectedRoute from './components/ProtectedRoute'; // ⬅️ Added this import
// import Home from './components/Home';
// import MyPlans from './components/MyPlans';
// // import MarketAnalysis from './components/MarketAnalysis';
// import PlantDease from './components/PlantDease';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Snav /> {/* Keep navbar visible always */}
//         <Routes>

//           {/* Public routes */}
//           <Route path='/' element={<Home/>}/>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot" element={<Forgot />} />
//           <Route path="/success" element={<Success />} />

//           {/* Protected routes (only when logged in) */}
//           <Route
//             exact
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/MyComplain"
//             element={
//               <ProtectedRoute>
//                 <MyComplain />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/User"
//             element={
//               <ProtectedRoute>
//                 <User />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/Administrator"  ///
//             element={
//               <ProtectedRoute>
//                 <Administrator />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/Edit"
//             element={
//               <ProtectedRoute>
//                 <Edit />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/RoleWork"
//             element={
//               <ProtectedRoute>
//                 <RoleWork />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/ai-suggestion"
//             element={
//               <ProtectedRoute>
//                 <AISuggestion />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/irrigationplan"
//             element={
//               <ProtectedRoute>
//                 <IrrigationPlanner />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/fertilizer-advice"
//             element={
//               <ProtectedRoute>
//                 <FertilizerAdvisor />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/chatbot"
//             element={
//               <ProtectedRoute>
//                 <AIChatbot />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/report"
//             element={
//               <ProtectedRoute>
//                 <SustainabilityReport />
//               </ProtectedRoute>
//             }
//           />

//            <Route
//             path="/myplans"
//             element={
//               <ProtectedRoute>
//                 <MyPlans />
//               </ProtectedRoute>
//             }
//           />
//             <Route
//             path="/desease"
//             element={
//               <ProtectedRoute>
//                 <PlantDease/>
//               </ProtectedRoute>
//             }
//           />

//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;












import logo from './logo.svg';
import './App.css';
import "./i18n"; 

import Login from './components/login';
import User from './components/User';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Administrator from './components/AdminComplaints';
import Register from './components/register';
import Success from './components/success';
import Snav from './components/sidenav';
import MyComplain from './components/Complain';
import Edit from './components/Edit';
import Forgot from './components/Forgot';
import RoleWork from './components/RoleWork';
import Dashboard from './components/Dashboard';
import AISuggestion from './components/AISuggestion';
import IrrigationPlanner from './components/IrrigationPlanner';
import FertilizerAdvisor from './components/FertilizerAdvisor';
import AIChatbot from './components/AIChatbot';
import SustainabilityReport from './components/SustainabilityReport';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import MyPlans from './components/MyPlans';
import PlantDease from './components/PlantDease';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Snav />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/success" element={<Success />} />

          {/* Administartor */}
          <Route path="/administrator" element={<ProtectedRoute><Administrator /></ProtectedRoute>} />

          {/* Complaints */}

          <Route path="/complaints" element={<ProtectedRoute><MyComplain /></ProtectedRoute>} />


          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/MyComplain" element={<ProtectedRoute><MyComplain /></ProtectedRoute>} />
          <Route path="/User" element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path="/Admin" element={<ProtectedRoute><Administrator /></ProtectedRoute>} />
          <Route path="/Edit" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
          <Route path="/RoleWork" element={<ProtectedRoute><RoleWork /></ProtectedRoute>} />
          <Route path="/ai-suggestion" element={<ProtectedRoute><AISuggestion /></ProtectedRoute>} />
          <Route path="/irrigationplan" element={<ProtectedRoute><IrrigationPlanner /></ProtectedRoute>} />
          <Route path="/fertilizer-advice" element={<ProtectedRoute><FertilizerAdvisor /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ProtectedRoute><AIChatbot /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><SustainabilityReport /></ProtectedRoute>} />
          <Route path="/myplans" element={<ProtectedRoute><MyPlans /></ProtectedRoute>} />
          <Route path="/desease" element={<ProtectedRoute><PlantDease /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
