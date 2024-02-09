import API from '@/api';

class PackageService {
    
    SearchPackages(name: string, limit?: number, page?: number) {
        return API.PackageAPI.SearchPackage(name, limit, page);
    }

    GetPackageMeta(name: string) {
        return API.PackageAPI.GetPackageMeta(name);
    }

}

export default PackageService;