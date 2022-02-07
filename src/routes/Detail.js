// import { gql } from "apollo-boost";
// import { useQuery, useReactiveVar } from "@apollo/react-hooks";
// import { testsVar } from "./../apollo";
// import { Link } from "react-router-dom";

// const GET_TESTS = gql`
//   query GetTests {
//     tests @client
//   }
// `;

// export default () => {
//   const { loading, error, data } = useQuery(GET_TESTS);
//   const tests = useReactiveVar(testsVar);
//   console.log(tests);

//   const btnClick = () => {
//     testsVar([...testsVar(), { id: tests.length, title: "title" }]);
//   };
//   return (
//     <>
//       <button onClick={() => btnClick()}>test</button>
//       <div>
//         {tests?.map((data, i) => (
//           <div key={i}>
//             <p1>data{data.id}</p1>
//             <button
//               onClick={() =>
//                 // console.log(i)
//                 testsVar(testsVar().filter((test) => test.id !== data.id))
//               }
//             >
//               del
//             </button>
//           </div>
//         ))}
//       </div>

//       <Link to={"/"}>go!</Link>
//     </>
//   );
// };
