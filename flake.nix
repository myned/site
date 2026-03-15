{
  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts"; # https://flake.parts/index.html
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
  };

  outputs = inputs:
    inputs.flake-parts.lib.mkFlake {inherit inputs;} {
      systems = [
        "aarch64-linux"
        "x86_64-linux"
      ];

      # https://wiki.nixos.org/wiki/Node.js
      # https://zackmyers.io/blog/deploy-astro-on-nixos/
      perSystem = {
        lib,
        pkgs,
        ...
      }: {
        #?? nix shell
        packages.default = pkgs.buildNpmPackage {
          name = "site";
          src = ./.;
          npmDepsHash = "sha256-ssExj4t6jF0HM6oSHKTHGNdNZviHEQJpBJFUJ8wkdqE=";

          meta = with lib; {
            description = "Personal website, built with Astro and served by Node.js";
            homepage = "https://git.bjork.tech/myned/site";
            license = licenses.mit;
            platforms = platforms.linux;
            mainProgram = "site";
          };
        };
      };
    };
}
