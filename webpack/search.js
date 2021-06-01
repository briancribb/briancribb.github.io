/*
=======================================================================
=======================================================================

All of the site search functionality lives here.
1. Stuff is entered into the search form.
2. The handler function filters that down to valid terms
3. Redirect to the search page with query parameters.
4. If on the search page, pull the query params and run the search.
5. Build the markup for the search results.

=======================================================================
=======================================================================
*/

var search = {
    init : function(TMC) {
        TMC.eventTasks.click.push(this.handleSearch);
        TMC.eventTasks.keyup.push(this.handleSearch);

        fetch(window.location.origin+'/search.json', {
                credentials: 'same-origin',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then((data)=>{
                // After we get the JSON, we're going to enable the search form.
                document.querySelectorAll('#tmc-search-input, #tmc-search-button').forEach((el)=>{el.disabled = false});
                data.posts.forEach((post, index)=>{
                    post.key  = index;
                    if (post.excerpt) {

                        /*
                        Sigh. Running this twice on purpose. Jekyll is escaping a single quote 
                        (used as an apostrophe) as "&amp;#8217;" instead of "&#8217;". So the 
                        first pass just changes it to "&#8217;" as a string in the final display 
                        code. Running it twice solves this. Fortunately, we're just doing this 
                        one big time as the data first comes in.
                        */
                        post.title      = TMC.utils.decodeHtmlEntities(post.title.trim());
                        post.title      = TMC.utils.decodeHtmlEntities(post.title.trim());
                        post.excerpt    = TMC.utils.decodeHtmlEntities(post.excerpt.trim());
                        post.excerpt    = TMC.utils.decodeHtmlEntities(post.excerpt.trim());
                        post.arrExcerpt = TMC.utils.splitOnTags(post.excerpt);
                    }
                    if (post.categories) post.categories = post.categories.split(',');
                    post.tags = post.tags ? post.tags.split(',') : [];

                });
                this.data = data;
                if (document.body.classList.contains('search')) this.buildSearchPage(this.getMatches(this.getQueryParams(), this.data));
            });
    },
    handleSearch : function(evt) {
        /*
        NOTE: Handler functions are called from one delegated listener in the main module, so 
        the context of "this" is the TMC object. Within this handler, this modules functions 
        are called with "this.search.myMethod()".
        */

        // Gotta be click on the button or keyup on the Enter key.

        if (evt.type !== "click" && evt.type !== "keyup") return;
        if (evt.type === "keyup" && evt.keyCode !== 13) return;
        if ( !evt.target.classList.contains('tmc-search') ) return;
        let str = null;

        if (
               (evt.type === "click" && evt.target.id === 'tmc-search-button')
               || 
               (evt.type === "keyup" && evt.target.id === 'tmc-search-input')
           ) {
            // Search input from the button or the Enter key.
            str = document.getElementById('tmc-search-input').value;

        } else if (evt.type === "click" && evt.target.id !== 'tmc-search-input') {
            // Links or buttons that will trigger a search.
            if (evt.target.dataset.terms) str = evt.target.dataset.terms;
        }

        if (!str) return;

        let arrTerms = this.search.getSearchTerms(str);
        if (arrTerms.length) window.location = window.location.origin + '/search/?terms=' + this.search.getSearchTerms(str).join('+');
    },
    getSearchTerms: function(str) {
        /*
        Accepts a string from the search input and returns an array of search terms.
        */
        let invalidTerms = ['the', 'and', 'from', 'with'],
            arrTerms = [];

        str = str.replace(',', ' ');
        str.split(' ').forEach((term)=>{
            if  (
                term.length > 1 
                && 
                !invalidTerms.includes(term.toLowerCase()) 
                &&
                !arrTerms.includes(term.toLowerCase()) 
                ) 
                arrTerms.push(term.toLowerCase());
        });

        /*
        Strip out weird stuff like commas and colons and things.
        https://stackoverflow.com/questions/32106243/regex-to-remove-all-non-alpha-numeric-and-replace-spaces-with/32106277
        */
        arrTerms.forEach((term)=>{
            term = term.replace(/[^a-z0-9+]+/gi, '+');
        });
        return arrTerms;
    },
    getQueryParams: function() {
        /*
        Get search terms from query string parameters.

        Parameters should be one query string parameter called "terms" with a string separated by a 
        plus sign. But just in case, for come crazy reason, the query string parameters end up as 
        "?terms=stuff+things&terms=blah" then we need to prepare for it. Such a string would come 
        out as ["stuff+things", "blah"] so we join that on the plus to make "stuff+things+blah".
        Then we can split the whole thing on the plus and we're good to go.

        NOTE: the plus sign in a query string signifies a space, so URLSearchParams will turn any 
        plus signs into spaces before returning its array.
        */
        let params = new URLSearchParams(window.location.search.slice(1));
        let terms = params.getAll('terms').join(' ').toLowerCase().split(' ');
        return terms;
    },
    getMatches: function(terms, data) {
        /*
        A post must match all terms in order to pass. Adding more terms will narrow the results.
        */
        let posts = data.posts.filter((post)=>{
            let match = true;

            terms.forEach((term)=>{
                if (
                    !post.title.toLowerCase().includes(term) 
                    &&
                    !post.url.toLowerCase().includes(term) 
                    &&
                    !(post.excerpt && post.excerpt.toLowerCase().includes(term) )
                    &&
                    !post.tags.filter( tag => tag.toLowerCase() === term.toLowerCase() ).length
                    ) match = false;
            });
            return match;
        });

        let tags = data.tags.filter((tag)=>{
            return terms.includes(tag.label);
        });
        return {terms, posts, tags};
    },
    buildSearchPage : function(objMatches) {

        document.getElementById('tmc-search-input').value = objMatches.terms.join(' ');
        let Results = class extends React.Component {
            constructor(props) {
                super(props);
                this.state = objMatches;
                //this._myMethod  = this._myMethod.bind(this);
            }

            _getMatches() {
                return(
                    this.props.matches.posts.map((post)=>{
                        //let excerpt = <div className="post-excerpt">{post.excerpt}</div> || null;
                        let excerpt = <div dangerouslySetInnerHTML={{__html: post.excerpt}}></div> || null;
                        let categories = null;
                        let tags = null;

                        if (post.categories && post.categories.length) {
                            categories = (<div className="post-category"><strong>Category:</strong> {post.categories.join(', ')}</div>);
                        }
                        if (post.tags && post.tags.length) {
                            tags = (
                                <div className="post-tags mt-1">
                                <strong className="me-1">Tags:</strong>{post.tags.map((tag, index)=>{
                                    let link = location.origin + "/search/?terms=" + tag;
                                    return (
                                        <span key={index}>
                                            <a role="button" href={link}>{tag}</a>
                                            {index < post.tags.length - 1 && ', '}
                                        </span>
                                    );
                                })}
                                </div>
                            );
                        }

                        //let tags = <div className="post-tags"><small><strong>Tags:</strong> {post.tags.join(', ')}</small></div> || null;
                        let url = location.origin + post.url;
                        return (
                            <li key={post.key} className="mb-3">
                                <h2 className="post-title"><a title={post.title} href={url}>{post.title}</a></h2>
                                <time className="d-block text-muted mb-2" dateTime="{post.date}"><small>{post.dateString}</small></time>
                                {excerpt}
                                {categories}
                                {tags}
                            </li>
                        );
                    })
                );
            }

            render() {
                let matches = this._getMatches(),
                    matchMarkup = null,
                    matchTitleText = "Sorry, no matches for: ";
                if (matches.length) {
                    matchTitleText = "Matches for: ";
                    matchMarkup = (
                        <ul className="post-list d-flex flex-column list-unstyled p-0 m-0">
                            {matches}
                        </ul>
                    );
                }
                return(
                    <div className="matches">
                        <h1 className="mb-3">{matchTitleText}{this.props.matches.terms.join(', ')}</h1>
                        {matchMarkup}
                    </div>
                );
            }
        }
        ReactDOM.render(
            <Results matches={objMatches} />, document.getElementById('search-results-container')
        );
    }
}
// https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
export default search;