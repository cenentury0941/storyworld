async function fetchDataWithAuth(authToken: string, json_text: string): Promise<any> {

    let json_data = JSON.parse(json_text);

    try {
      const headers = new Headers();
      
      headers.append('Authorization', `Bearer ${authToken}`);
      
      headers.append('x-auth-token', authToken);

      headers.append('accept', "application/json");

      headers.append('Content-Type', "application/json");

  
      const title_request = { title : json_data["title"], body: json_data["story"]["start"]["story_segment"] }

      const title_response = await fetch(storiesUrl, {
        method: 'POST',
        headers: headers,
        body : JSON.stringify(title_request)
      });
  
      if (!title_response.ok) {
        throw new Error(`HTTP error! Status: ${title_response.status}`);
      }
  
      const data = await title_response.json();
      
      const story_hash = data["hashId"]

      console.log("story hash : " , story_hash)

      const branch1_request = {
        hashParentId: story_hash,
        isExtraTwist: true,
        title: json_data["story"]["start"]["branch_1"],
        body: json_data["story"]["branch_1"]["story_segment"]
      }

      const branch2_request = {
        hashParentId: story_hash,
        isExtraTwist: true,
        title: json_data["story"]["start"]["branch_2"],
        body: json_data["story"]["branch_2"]["story_segment"]
      }

      const branch1_response = await fetch(twistsUrl, {
        method: 'POST',
        headers: headers,
        body : JSON.stringify(branch1_request)
      });

      if (!branch1_response.ok) {
        throw new Error(`HTTP error! Status: ${branch1_response.status}`);
      }
      const branch1_data = await branch1_response.json();

      const branch2_response = await fetch(twistsUrl, {
        method: 'POST',
        headers: headers,
        body : JSON.stringify(branch2_request)
      });

      if (!branch2_response.ok) {
        throw new Error(`HTTP error! Status: ${branch2_response.status}`);
      }
      const branch2_data = await branch2_response.json();

      const branch1_hash = branch1_data["hashId"]
      const branch2_hash = branch2_data["hashId"]


      
      const branch3_request = {
        hashParentId: branch1_hash,
        isExtraTwist: true,
        title: json_data["story"]["branch_1"]["branch_3"],
        body: json_data["story"]["branch_3"]["story_segment"]
      }

      const branch4_request = {
        hashParentId: branch1_hash,
        isExtraTwist: true,
        title: json_data["story"]["branch_1"]["branch_4"],
        body: json_data["story"]["branch_4"]["story_segment"]
      }

      const branch3_response = await fetch(twistsUrl, {
        method: 'POST',
        headers: headers,
        body : JSON.stringify(branch3_request)
      });

      if (!branch3_response.ok) {
        throw new Error(`HTTP error! Status: ${branch3_response.status}`);
      }
      const branch3_data = await branch3_response.json();
      const branch3_hash = branch3_data["hashId"]
      console.log("branch 3 complete")

      const branch4_response = await fetch(twistsUrl, {
        method: 'POST',
        headers: headers,
        body : JSON.stringify(branch4_request)
      });

      if (!branch4_response.ok) {
        throw new Error(`HTTP error! Status: ${branch4_response.status}`);
      }

      console.log("branch 4 complete")
      const branch4_data = await branch4_response.json();
      const branch4_hash = branch4_data["hashId"]


      const branch5_request = {
        hashParentId: branch2_hash,
        isExtraTwist: true,
        title: json_data["story"]["branch_2"]["branch_5"],
        body: json_data["story"]["branch_5"]["story_segment"]
      }

      const branch6_request = {
        hashParentId: branch2_hash,
        isExtraTwist: true,
        title: json_data["story"]["branch_2"]["branch_6"],
        body: json_data["story"]["branch_6"]["story_segment"]
      }

      const branch5_response = await fetch(twistsUrl, {
        method: 'POST',
        headers: headers,
        body : JSON.stringify(branch5_request)
      });

      if (!branch5_response.ok) {
        throw new Error(`HTTP error! Status: ${branch5_response.status}`);
      }
      const branch5_data = await branch5_response.json();
      const branch5_hash = branch5_data["hashId"]
      console.log("branch 5 complete")

      const branch6_response = await fetch(twistsUrl, {
        method: 'POST',
        headers: headers,
        body : JSON.stringify(branch6_request)
      });

      if (!branch6_response.ok) {
        throw new Error(`HTTP error! Status: ${branch6_response.status}`);
      }
      const branch6_data = await branch6_response.json();
      const branch6_hash = branch6_data["hashId"]
      console.log("branch 6 complete")


      console.log("publishing twists...")


      const publish_headers = new Headers();
      
      publish_headers.append('Authorization', `Bearer ${authToken}`);
      
      publish_headers.append('x-auth-token', authToken);

      publish_headers.append('accept', "application/json");

      const story_publish_response = await fetch("https://story3.com/api/v2/twists/"+story_hash+"/publish", {
        method: 'POST',
        headers: publish_headers
      });

      if (!story_publish_response.ok) {
        throw new Error(`HTTP error! Status: ${story_publish_response.status}`);
      }

      console.log("story done processing")

      const branch1_publish_response = await fetch("https://story3.com/api/v2/twists/"+branch1_hash+"/publish", {
        method: 'POST',
        headers: publish_headers
      });

      if (!branch1_publish_response.ok) {
        throw new Error(`HTTP error! Status: ${branch1_publish_response.status}`);
      }

      console.log("Branch 1 done processing")



      const branch2_publish_response = await fetch("https://story3.com/api/v2/twists/"+branch2_hash+"/publish", {
        method: 'POST',
        headers: publish_headers
      });

      if (!branch2_publish_response.ok) {
        throw new Error(`HTTP error! Status: ${branch2_publish_response.status}`);
      }

      console.log("Branch 2 done processing")



      const branch3_publish_response = await fetch("https://story3.com/api/v2/twists/"+branch3_hash+"/publish", {
        method: 'POST',
        headers: publish_headers
      });

      if (!branch3_publish_response.ok) {
        throw new Error(`HTTP error! Status: ${branch3_publish_response.status}`);
      }

      console.log("Branch 1 done processing")



      const branch4_publish_response = await fetch("https://story3.com/api/v2/twists/"+branch4_hash+"/publish", {
        method: 'POST',
        headers: publish_headers
      });

      if (!branch4_publish_response.ok) {
        throw new Error(`HTTP error! Status: ${branch4_publish_response.status}`);
      }

      console.log("Branch 4 done processing")



      const branch5_publish_response = await fetch("https://story3.com/api/v2/twists/"+branch5_hash+"/publish", {
        method: 'POST',
        headers: publish_headers
      });

      if (!branch5_publish_response.ok) {
        throw new Error(`HTTP error! Status: ${branch5_publish_response.status}`);
      }

      console.log("Branch 5 done processing")



      const branch6_publish_response = await fetch("https://story3.com/api/v2/twists/"+branch6_hash+"/publish", {
        method: 'POST',
        headers: publish_headers
      });

      if (!branch6_publish_response.ok) {
        throw new Error(`HTTP error! Status: ${branch6_publish_response.status}`);
      }

      console.log("Branch 6 done processing")


      console.log(data)
      return data;

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  const storiesUrl = 'https://story3.com/api/v2/stories';
  const twistsUrl = 'https://story3.com/api/v2/twists';
  const authToken = ''; //Enter your api key

let uploadStory = (json_text: string) => {
    fetchDataWithAuth(authToken, json_text)
    .then((data) => {
      console.log('Data:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export default uploadStory;