import React, { useState, useEffect } from 'react';
import { Search, Image } from 'semantic-ui-react'
import { getImageUrl, postSearch } from './../../../api';
import { LockSymbol } from '../widgets/widgets';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '../../../utils/react-auth0-spa';

const SearchBox = ({ children, ...searchProps} ) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState('');
  const { accessToken } = useAuth0();
  let history = useHistory();

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    postSearch(accessToken, value).then((res) => {
      if (!canceled) {
        setResults(res);
        setLoading(false);
      }
    });
    return () => (canceled = true);
  }, [value]);

  return (
    <Search
      id="mySearch"
      loading={loading}
      onResultSelect={(e, { result }) => history.push(result.url)}
      onSearchChange={(e, { value }) => {
        setValue(value);
      }}
      resultRenderer={(data) => {
        let { mediaid, mediaurl, title, description, lockedadmin, lockedsuperadmin } = data;
        var imageSrc = null;
        if (mediaid > 0) {
          imageSrc = getImageUrl(mediaid, 45);
        } else if (mediaurl) {
          imageSrc = mediaurl;
        }
        return (
          <>
            <div className='image'>
              {imageSrc && <Image style={{objectFit: 'cover', width: '45px', height: '45px'}} src={imageSrc} />}
            </div>
            <div className='content'>
              {title && <div className='title'>{title} <LockSymbol lockedAdmin={lockedadmin} lockedSuperadmin={lockedsuperadmin} /></div>}
              {description && <div className='description'>{description}</div>}
            </div>
          </>
        )
      }}
      minCharacters={1}
      results={results.map(s => ({ ...s, key: s.url }))}
      value={value}
      {...searchProps}
    />
  );
}

export default SearchBox;
