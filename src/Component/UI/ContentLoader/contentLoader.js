import React,{Component} from 'react'
import ContentLoader, { Facebook } from 'react-content-loader'

class ContentLoade extends Component {

    render (){
        let contentLoader = null;
        if(this.props.content === 'filterform'){
            contentLoader = <ContentLoader 
            // height={240}
            speed={1}
            backgroundColor={'#d9d7d2'}
            foregroundColor={'#999'}
            viewBox="0 0 600 2000">
            {/* Only SVG shapes */}    
            <rect x="20" y="15" rx="4" ry="4" width="600" height="200" />
            <rect x="20" y="275" rx="4" ry="4" width="600" height="200" />
            <rect x="20" y="525" rx="4" ry="4" width="600" height="200" />
            <rect x="20" y="775" rx="4" ry="4" width="600" height="200" />
            <rect x="20" y="1025" rx="4" ry="4" width="200" height="100" />

          </ContentLoader>

        }else if(this.props.content === 'products'){
            contentLoader = <ContentLoader 
            // height={240}
            speed={1}
            backgroundColor={'#d9d7d2'}
            foregroundColor={'#999'}
            viewBox="0 0 600 2000">
            {/* Only SVG shapes */}    
            <rect x="15" y="15" rx="4" ry="4" width="190" height="200" />
            <rect x="220" y="15" rx="4" ry="4" width="190" height="200" />
            <rect x="425" y="15" rx="4" ry="4" width="190" height="200" />
            <rect x="15" y="250" rx="4" ry="4" width="190" height="200" />
            <rect x="220" y="250" rx="4" ry="4" width="190" height="200" />
            <rect x="425" y="250" rx="4" ry="4" width="190" height="200" />

          </ContentLoader>
        }

        return(contentLoader)
    }
}

export default ContentLoade;