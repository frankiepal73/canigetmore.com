import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { city: 'San Francisco', lat: 37.7749, lng: -122.4194, salary: 150000 },
  { city: 'New York', lat: 40.7128, lng: -74.0060, salary: 140000 },
  { city: 'Seattle', lat: 47.6062, lng: -122.3321, salary: 135000 },
  { city: 'Austin', lat: 30.2672, lng: -97.7431, salary: 120000 },
  { city: 'Boston', lat: 42.3601, lng: -71.0589, salary: 130000 },
];

export default function JobMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 400;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3.geoAlbersUsa()
      .scale(width)
      .translate([width / 2, height / 2]);

    const colorScale = d3.scaleLinear<string>()
      .domain([d3.min(data, d => d.salary)!, d3.max(data, d => d.salary)!])
      .range(["#818cf8", "#4f46e5"]);

    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => projection([d.lng, d.lat])![0])
      .attr("cy", d => projection([d.lng, d.lat])![1])
      .attr("r", 8)
      .attr("fill", d => colorScale(d.salary))
      .attr("opacity", 0.8)
      .append("title")
      .text(d => `${d.city}: $${d.salary.toLocaleString()}`);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <svg ref={svgRef} width="100%" height="400" />
      <div className="mt-4 flex justify-between text-sm">
        <span className="text-gray-500">Lower Salary Range</span>
        <span className="text-gray-500">Higher Salary Range</span>
      </div>
    </div>
  );
}