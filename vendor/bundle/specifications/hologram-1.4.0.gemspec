# -*- encoding: utf-8 -*-
# stub: hologram 1.4.0 ruby lib

Gem::Specification.new do |s|
  s.name = "hologram"
  s.version = "1.4.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["JD Cantrell", "August Flanagan"]
  s.date = "2015-03-29"
  s.description = "Build doc type things"
  s.email = ["jcantrell@trulia.com"]
  s.executables = ["hologram"]
  s.files = ["bin/hologram"]
  s.homepage = "http://trulia.github.io/hologram"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.4.5"
  s.summary = "Build document type things."

  s.installed_by_version = "2.4.5" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<redcarpet>, ["< 4.0", ">= 2.2"])
      s.add_runtime_dependency(%q<rouge>, [">= 1.5"])
      s.add_development_dependency(%q<bundler>, ["~> 1.3"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<rspec>, ["~> 2.14"])
      s.add_development_dependency(%q<haml>, [">= 0"])
      s.add_development_dependency(%q<slim>, [">= 0"])
    else
      s.add_dependency(%q<redcarpet>, ["< 4.0", ">= 2.2"])
      s.add_dependency(%q<rouge>, [">= 1.5"])
      s.add_dependency(%q<bundler>, ["~> 1.3"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<rspec>, ["~> 2.14"])
      s.add_dependency(%q<haml>, [">= 0"])
      s.add_dependency(%q<slim>, [">= 0"])
    end
  else
    s.add_dependency(%q<redcarpet>, ["< 4.0", ">= 2.2"])
    s.add_dependency(%q<rouge>, [">= 1.5"])
    s.add_dependency(%q<bundler>, ["~> 1.3"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<rspec>, ["~> 2.14"])
    s.add_dependency(%q<haml>, [">= 0"])
    s.add_dependency(%q<slim>, [">= 0"])
  end
end
