// import React from "react"



// const Header = ({ data }) => (
//   <header>
//     <div className="header">
//     <div className="logo">
//     <Img
//         fluid={data.strapiMenus.Logo.childImageSharp.fluid}
//         alt="A corgi smiling happily"
//       />
//     </div>
    
//       <nav>
//       <ul>
//         {data.strapiMenus.Menu.map(document => (
//           <li> <Link key={document.page.id} to={document.page.url}>{document.page.title}</Link></li>     
//         ))}
//         </ul>
//       </nav>
//     </div>
    
//   </header>
// )
// export default data => (
//   <StaticQuery
//     query={graphql`
//       query MyQuery {
//         strapiMenus {
//           id
//           Menu {
//             page {
//               url
//               title
//               id
//             }
//           }
//           Logo {
//             publicURL
//             name
//             childImageSharp {
//               fluid {
//                 base64
//                 aspectRatio
//                 src
//                 srcSet
//                 sizes
//               }
//             }
//           }
//         }
//       }
//     `}
//     render={data => <Header data={data}/>}
//   />
// )
