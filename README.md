<a name="readme-top"></a>

<!--
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



PROJECT LOGO

 <br />

 -->

## Rate Limiter

A rate limiter is a software or hardware component used to control the rate at which certain operations or requests are allowed to occur within a system or application. It is a crucial tool for managing and regulating the flow of data, requests, or actions to prevent overuse of resources, maintain system stability, and protect against abuse or denial-of-service attacks.

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li>
    <a href="#postman">Postman</a>
      <ul>
        <li><a href="#pre-request-script">Pre-Request-Script</a></li>
        <li><a href="#http-headers">Http-Headers</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [Rate Limiter](https://github.com/tanmayidev/rate-limiter) -->

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

### Built With

- NodeJS
- TypeScript
- ExpressJS
- Jest

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/tanmayidev/rate-limiter.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the project
   ```sh
   npm run start
   ```

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

1. **Endpoints**:

   This service provides two endpoints:

   - `/limited`: This endpoint is **rate-limited**.
   - `/unlimited`: This endpoint has no rate limits.

2. **Custom Rate Limiting**:

   To specify a custom rate limit and rate-limiting algorithm for a request, use the following HTTP headers:

   - `origin-ipaddress` (Mandatory for `/limited` endpoint): Set this header to specify the custom IP address for rate limiting.
   - `rate-limiting-algo`: Use this header to specify the rate limiting algorithm. It accepts the following values:

     ```
     0: Token Bucket
     1: Fixed Window Counter
     2: Sliding Window Log
     3: Sliding Window Counter
     ```

3. **Default Algorithm**:

   If the `rate-limiting-algo` header is not specified, it defaults to the **Token Bucket** algorithm.

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- POSTMAN -->

## Postman

Postman configurations to stress-test the apis

### Pre-Request-Script

The following script randomly picks ip-addresses from the given list (`ipAddrs`). Please see [Dynamic-variables](https://learning.postman.com/docs/writing-scripts/script-references/variables-list/) and [Using-variables](https://learning.postman.com/docs/sending-requests/variables/).

```javascript
function pickIpAddr() {
  const ipAddrs = ['143.33.72.232', '42.33.106.86', '164.78.11.195', '216.217.171.55', '181.81.57.111'];
  const idx = _.random(0, 4);
  return ipAddrs[idx];
}

pm.variables.set('custom_ip', pickIpAddr());
```

### Http-Headers

1. The `origin-ipaddress` is assigned a dynamic-variable (`{{custom_ip}}`), which is evaluated in the **Pre-Request Script**.
2. The `rate-limiting-algo` http-header specifies appropriate algorithm to be applied. _Look at [Enum, Step-2 in usage](#usage)_

```
origin-ipaddress:   {{custom_ip}}
rate-limiting-algo: 0
```

<!-- ROADMAP -->

## Roadmap

- [x] Token Bucket
- [x] Fixed Window Counter
- [x] Sliding Window Log
- [ ] Sliding Window Counter
  - [x] Implement the algorithm
  - [ ] Integrate with Load-Balancer in a horizontally scaled architecture.
- [ ] Write unit-tests

See the [open issues](https://github.com/tanmayidev/rate-limiter/issues) for a full list of proposed features (and known issues).

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- LICENSE -->

## License

Distributed under the ISC License.
[MIT License](./LICENSE)

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- ACKNOWLEDGMENTS -->

<!-- ## Acknowledgments

- []()
- []()
- []()

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[NodeJS]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en
[ExpressJS]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[ExpressJS-url]: https://expressjs.com/
[Jest]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white
[Jest-url]: https://jestjs.io/
